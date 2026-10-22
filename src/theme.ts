import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",

    background: {
      default: "#111827",
      paper: "#1f2937",
    },
  },

  shape: {
    borderRadius: 12,
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },

  shape: {
    borderRadius: 12,
  },
});