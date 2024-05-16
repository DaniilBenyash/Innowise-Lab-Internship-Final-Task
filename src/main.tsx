import React from "react";
import "./main.scss";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import { ApolloProvider } from "@apollo/client";
import { client } from "./app/apollo/client";
import { Toaster } from "react-hot-toast";
import "./app/i18n/i18n";
import { BrowserRouter as Router } from "react-router-dom";
import { LanguagesProvider } from "app/theme/LanguagesProvider";
import { ThemeProvider } from "app/theme/ThemeProvider";
import { AuthProvider } from "modules/common/utils";
import { GlobalStyles } from "@mui/material";
import { objectInsideStylesProperty } from "shared/utils";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <LanguagesProvider>
          <ThemeProvider>
            <AuthProvider>
              <GlobalStyles styles={objectInsideStylesProperty} />
              <App />
              <Toaster
                position="top-center"
                toastOptions={{
                  style: {
                    border: "5px solid #713200",
                    fontSize: "25px",
                  },
                }}
              />
            </AuthProvider>
          </ThemeProvider>
        </LanguagesProvider>
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
);
