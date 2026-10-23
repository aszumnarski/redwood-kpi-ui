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
    borderRadius: 10,
  },
  typography: { fontFamily: '"Inter", "Segoe UI", Arial, sans-serif', h6: { fontWeight: 700 }, button: { textTransform: "none", fontWeight: 600 } },
  components: { MuiCard: { styleOverrides: { root: { border: "1px solid", borderColor: "rgba(148, 163, 184, 0.16)", boxShadow: "0 1px 2px rgba(0,0,0,0.12)" } } } },
});

export const lightTheme = createTheme({
  shape: {
    borderRadius: 10,
  },
  palette: {
    mode: "light",
    primary: { main: "#2563eb" },
    background: { default: "#f5f7fb", paper: "#ffffff" },
    text: { primary: "#172033", secondary: "#64748b" },
  },
  typography: { fontFamily: '"Inter", "Segoe UI", Arial, sans-serif', h6: { fontWeight: 700 }, button: { textTransform: "none", fontWeight: 600 } },
  components: {
    MuiCard: { styleOverrides: { root: { border: "1px solid #e6eaf0", boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)" } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
  },
});
