import React from "react";
import {
  createTheme,
  Theme,
  ThemeProvider as ThemeProviderMUI,
} from "@mui/material/styles";

type ThemeProviderProps = {
  children: React.ReactNode;
  theme?: Theme;
};

const theme = createTheme({
  components: {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          overflowX: "initial",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#2E2E2E",
    },
    secondary: {
      main: "#C63031",
    },
    info: {
      main: "#727272",
    },
  },
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <ThemeProviderMUI theme={theme}>{children}</ThemeProviderMUI>;
};
