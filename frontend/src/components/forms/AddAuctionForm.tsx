import { Form, Formik } from "formik";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ValidatedField from "../utils/ValidatedField";
import * as Yup from "yup";
import FormContainer from "../utils/FormContainer";
import { errorRequired } from "../../constants/errorMessages";
import axios from "axios";
import { apiPostCreateAuction } from "../../constants/endpoints";
import { headers } from "../../constants/headers";
import React, { useContext, useState } from "react";
import authContext from "../../AuthContext";
import { toBackendDateFormat } from "../../utils/dateFormatter";
import { regexURL } from "../../constants/regex";
import { DATE_FORMAT, MILLISECONDS_IN_A_DAY } from "../../constants/constants";
import { DateTimePicker } from "@mui/x-date-pickers";

interface IFormValues {
  name: string;
  start_price: number;
  product_info: string;
  picture_url: string;
  author_name: string;
}

function AddAuctionForm() {
  const { username } = useContext(authContext);

  const dateNow = new Date();
  const [startTime, setStartTime] = useState<Date | null>(
    new Date(dateNow.getTime() + 60 * 1000)
  );
  const [endTime, setEndTime] = useState<Date | null>(
    new Date(dateNow.getTime() + MILLISECONDS_IN_A_DAY + 60 * 1000)
  );

  let dateError = startTime! > endTime!;

  const initialFormValues: IFormValues = {
    name: "",
    start_price: 0,
    product_info: "",
    picture_url: "",
    author_name: username,
  };

  const formValidator = Yup.object().shape({
    name: Yup.string().required(errorRequired).max(30),
    start_price: Yup.number()
      .typeError("Prosím, zadejte celé kladné číslo")
      .required(errorRequired)
      .min(1, "Částka musí být alespoň 1 Kč."),
    product_info: Yup.string(),
    picture_url: Yup.string()
      .required(errorRequired)
      .matches(regexURL, "Zadejte prosím validní URL adresu obrázku."),
  });

  const handleSubmit = async (values: IFormValues) => {
    console.log("Start time before: " + startTime);

    const valuesToSend = {
      ...values,
      start_time: toBackendDateFormat(startTime!),
      end_time: toBackendDateFormat(endTime!),
    };

    console.log("Start time after: " + valuesToSend.start_time);

    try {
      const response = await axios.post(
        apiPostCreateAuction,
        valuesToSend,
        headers
      );
      if (response.status == 201) {
        alert("Aukce byla vytvořena.");
      }
    } catch (error: any) {
      if (error.response.status == 422) {
        dateError = true;
      } else if (error.response.status == 500) {
        alert("Server error.");
      }
    }
  };

  return (
    <FormContainer>
      <Formik
        initialValues={initialFormValues}
        validationSchema={formValidator}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
          <Grid container spacing={2} marginBottom={1} xs={12}>
            <Grid item xs={12} marginTop={1}>
              <Typography variant="h6">Nová aukce</Typography>
            </Grid>
            <Grid item xs={12}>
              <ValidatedField name="name" label="Název produktu" required />
            </Grid>
            <Grid item xs={12}>
              <ValidatedField
                name="start_price"
                label="Vyvolávací cena"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Kč</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <DateTimePicker
                label="Datum spuštění aukce"
                value={startTime}
                onChange={(val) => setStartTime(val)}
                inputFormat={DATE_FORMAT}
                minDateTime={new Date()}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={dateError}
                    helperText={
                      dateError ? "Aukce musí začít před jejím skončení." : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <DateTimePicker
                label="Datum ukončení aukce"
                value={endTime}
                onChange={(val) => setEndTime(val)}
                inputFormat={DATE_FORMAT}
                minDateTime={startTime}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={dateError}
                    helperText={
                      dateError ? "Aukce musí končit po jejím spuštění." : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <ValidatedField
                name="picture_url"
                label="Fotografie produktu"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <ValidatedField
                name="product_info"
                label="Popis produktu"
                multiline
                rows={2}
                inputProps={{
                  maxLength: 600,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit">Vytvořit aukci</Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </FormContainer>
  );
}

export default AddAuctionForm;
