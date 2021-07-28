import { createTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
const theme = createTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: "#ffffff !important",
      },
    },
  },
  palette: {
    primary: {
      main: "#4076d8",
    },
    secondary: {
      main: red[500],
    },
  },
});

theme.typography.h1 = {
  fontSize: "1.3rem",
  fontWeight: 400,
  "@media (min-width:600px)": {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "4rem",
  },
};
theme.typography.h3 = {
  fontSize: "1.1rem",
  fontWeight: 200,
  "@media (min-width:600px)": {
    fontSize: "1.3rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};
export default theme;
