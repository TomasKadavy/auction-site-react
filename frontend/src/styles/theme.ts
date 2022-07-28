import { createTheme } from "@mui/material";

export const appTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: "text",
        size: "large",
      },
      styleOverrides: {
        root: {
          color: "white",
          backgroundColor: "#2388a9",
          "&:hover": {
            backgroundColor: "#30abd5",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          maxWidth: "28rem",
        },
      },
    },
  },
});
