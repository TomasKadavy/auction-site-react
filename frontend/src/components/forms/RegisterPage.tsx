import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Button, Grid, Typography } from "@mui/material";
import ValidatedField from "../utils/ValidatedField";
import FormContainer from "../utils/FormContainer";
import {
  errorEmailInUse,
  errorMax,
  errorMin,
  errorNameExists,
  errorRequired,
} from "../../constants/errorMessages";
import axios from "axios";
import { apiPostRegister } from "../../constants/endpoints";
import { headers } from "../../constants/headers";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN } from "../../constants/routes";

interface IFormValues {
  name: string;
  email: string;
  password: string;
  passwordMatch: string;
}

function RegisterPage() {
  const [registered, setRegistered] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const initialFormValues: IFormValues = {
    name: "",
    email: "",
    password: "",
    passwordMatch: "",
  };

  const labels: IFormValues = {
    name: "Přezdívka",
    email: "Email",
    password: "Heslo",
    passwordMatch: "Heslo znovu",
  };

  const formValidator = Yup.object().shape({
    name: Yup.string()
      .required(errorRequired)
      .min(4, errorMin(labels.name, 4))
      .max(30, errorMax(labels.name, 30)),
    email: Yup.string().email("Zadejte validní email.").required(errorRequired),
    password: Yup.string()
      .required(errorRequired)
      .min(8, errorMin(labels.password, 8))
      .max(30, errorMax(labels.password, 30)),
    passwordMatch: Yup.string()
      .required(errorRequired)
      .oneOf([Yup.ref("password"), null], "Hesla se musí shodovat."),
  });

  const handleSubmit = async ({ name, email, password }: IFormValues) => {
    try {
      const response = await axios.post(
        apiPostRegister,
        { name, email, password },
        headers
      );
      if (response.status == 201) {
        setRegistered(true);
        setName(name);
        setEmail(email);
      }
    } catch (error: any) {
      if (error.response.status == 400) {
        if (error.response.data.detail == "user already exists") {
          setNameError(true);
        } else if (error.response.data.detail == "email already in use") {
          setEmailError(true);
        }
      }
    }
  };

  const registerForm = (
    <Formik
      initialValues={initialFormValues}
      validationSchema={formValidator}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12} marginTop={1}>
            <Typography variant="h6">Registrace</Typography>
          </Grid>
          <Grid item xs={12}>
            <ValidatedField
              name="name"
              label={labels.name}
              required
              error={nameError}
              setError={setNameError}
              helperText={nameError ? errorNameExists : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <ValidatedField
              name="email"
              type="email"
              label={labels.email}
              required
              error={emailError}
              setError={setEmailError}
              helperText={emailError ? errorEmailInUse : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <ValidatedField
              name="password"
              type="password"
              label={labels.password}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <ValidatedField
              name="passwordMatch"
              type="password"
              label={labels.passwordMatch}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit">Zaregistrovat se</Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );

  const successfulRegister = (
    <Grid container spacing={2}>
      <Grid item xs={12} marginTop={1}>
        <Typography variant="h6">Nový účet byl vytvořen!</Typography>
        <Typography variant="body1">Jméno: {name}</Typography>
        <Typography variant="body1">Email: {email}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Link to={LOGIN}>
          <Button>Přihlásit se</Button>
        </Link>
      </Grid>
    </Grid>
  );

  return (
    <FormContainer>
      {registered ? successfulRegister : registerForm}
    </FormContainer>
  );
}

export default RegisterPage;
