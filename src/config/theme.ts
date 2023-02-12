import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0067B2",
    },
    mode: "light",
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
