import { Grid } from "@mui/material";

function FormContainer({ children }: any) {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={11} textAlign="center">
        {children}
      </Grid>
    </Grid>
  );
}

export default FormContainer;
