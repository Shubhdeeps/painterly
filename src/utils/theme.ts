import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Kodchasan",
  },
  palette: {
    common: {
      black: "#000000",
      white: "#E3E3E3",
    },
    primary: {
      main: "#2A2A2A",
      dark: "#222222",
      light: "#353535",
      contrastText: "#E3E3E3",
    },
    secondary: {
      main: "#715539",
      dark: "#3F3327",
      light: "#FFB762",
    },
    text: {
      primary: "#E3E3E3",
      secondary: "#7A7A7A",
      disabled: "#707070",
    },
    background: {
      paper: "#353535",
    },
  },
});

//typography variants h1 to h6, subtitle1-2, body1-2, button, caption, overline, inherit,
