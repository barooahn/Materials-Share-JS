import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
const theme = createMuiTheme({
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
