import { createMuiTheme } from "@material-ui/core";

const Theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontFamily: ["Cookie", "cursive"].join(","),
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "Poppins",
      fontWeight: 300,
    },
    button: {
      fontFamily: "Raleway",
      fontWeight: 300,
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#fff",
    },
  },
});

export default Theme;
