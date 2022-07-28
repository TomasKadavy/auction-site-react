import React from "react";
import TextField from "@mui/material/TextField";
import { useField } from "formik";

interface Props {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  error?: boolean;
  setError?: (b: boolean) => void;
  helperText?: string;
  inputProps?: {};
  InputProps?: {};
  InputLabelProps?: {};
}

// Basic component extending MUI TextField with formik useField hook for showing error messages
function ValidatedField(props: Props) {
  const [field, metaData] = useField(props.name);

  const configTextField = {
    ...field,
    ...props,
    error: props.error ? props.error : false,
    helperText: props.helperText ? props.helperText : "",
  };

  if (metaData && metaData.touched && metaData.error) {
    configTextField.error = true;
    configTextField.helperText = metaData.error;
  }

  const resetError = () => {
    if (props.setError != undefined) {
      props.setError(false);
    }
  };

  return <TextField {...configTextField} onClick={resetError} />;
}

export default ValidatedField;
