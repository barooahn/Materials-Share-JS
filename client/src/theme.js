import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
const theme = createMuiTheme({
  // raisedPrimary: {
  //   color: theme.palette.getContrastText(theme.palette.primary[500]),
  //   backgroundColor: theme.palette.primary[500],
  //   '&:hover': {
  //     backgroundColor: theme.palette.primary[700],
  //   },
  // },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: "#ffffff !important",
      },
    },
  },
  palette: {
    primary: {
      main: "#86BBD8",
    },
    secondary: {
      main: red[500],
    },
  },
});
export default theme;
