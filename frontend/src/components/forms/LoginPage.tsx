import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Button, Grid, Typography } from "@mui/material";
import ValidatedField from "../utils/ValidatedField";
import { Link } from "react-router-dom";
import { HOME, REGISTER } from "../../constants/routes";
import FormContainer from "../utils/FormContainer";
import {
  errorBadName,
  errorBadPassword,
  errorMax,
  errorMin,
} from "../../constants/errorMessages";
import { useContext, useState } from "react";
import authContext from "../../AuthContext";
import axios from "axios";
import { apiPostLogin } from "../../constants/endpoints";
import { headers } from "../../constants/headers";

interface IFormValues {
  name: string;
  password: string;
}

function LoginPage() {
  const { username, login } = useContext(authContext);

  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const initialFormValues: IFormValues = {
    name: "",
    password: "",
  };

  const labels: IFormValues = {
    name: "Přezdívka",
    password: "Heslo",
  };

  const formValidator = Yup.object().shape({
    name: Yup.string().required("Zadejte vaši přezdívku."),
    password: Yup.string()
      .required("Zadejte vaše heslo.")
      .min(8, errorMin(labels.password, 8))
      .max(30, errorMax(labels.password, 30)),
  });

  const handleSubmit = async (values: IFormValues) => {
    try {
      const response = await axios.post(apiPostLogin, values, headers);
      if (response.status == 200) {
        const { name, email } = response.data;
        login(name, email);
      }
    } catch (error: any) {
      if (error.response.status == 404) {
        setNameError(true);
      } else if (error.response.status == 401) {
        setPasswordError(true);
      }
    }
  };

  const loginForm = (
    <Formik
      initialValues={initialFormValues}
      validationSchema={formValidator}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12} marginTop={1}>
            <Typography variant="h6">Přihlášení</Typography>
          </Grid>
          <Grid item xs={12}>
            <ValidatedField
              name="name"
              label={labels.name}
              required
              error={nameError}
              setError={setNameError}
              helperText={nameError ? errorBadName : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <ValidatedField
              name="password"
              type="password"
              label={labels.password}
              required
              error={passwordError}
              setError={setPasswordError}
              helperText={passwordError ? errorBadPassword : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit">Přihlásit se</Button>
          </Grid>
          <Grid item xs={12} marginTop={1}>
            <Typography variant="body1">
              Nemáte vytvořený účet?{" "}
              <Link to={REGISTER}>Zaregistrujte se.</Link>
            </Typography>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );

  const successfulLogin = (
    <Grid container spacing={2}>
      <Grid item xs={12} marginTop={1}>
        <Typography variant="h6">Přihlášen jako {username}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Link to={HOME}>
          <Button>Hlavní stránka</Button>
        </Link>
      </Grid>
    </Grid>
  );

  return (
    <FormContainer>
      {username === "" ? loginForm : successfulLogin}
    </FormContainer>
  );
}

export default LoginPage;
