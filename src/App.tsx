import { useEffect, useState } from "react";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import DashboardPage from "./pages/DashboardPage";
import { darkTheme, lightTheme } from "./theme";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <DashboardPage darkMode={darkMode} setDarkMode={setDarkMode} />
    </ThemeProvider>
  );
}

export default App;
