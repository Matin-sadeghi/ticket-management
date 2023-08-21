import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./context/AuthContext.tsx";

import axios from "axios";
import TicketProvider from "./context/TicketContext.tsx";
axios.defaults.withCredentials = true;
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AdminProvider } from "./context/AdminContext.tsx";

function start() {
  const [theme, colorMode] = useMode();

  return ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <TicketProvider>
            <AdminProvider>
              <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <App />
                </ThemeProvider>
              </ColorModeContext.Provider>
            </AdminProvider>
          </TicketProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

start();
