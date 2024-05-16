import React, { ReactNode } from "react";
import { AppBar as AppBarMUI } from "@mui/material";

type AppBarProps = {
  children: ReactNode;
};

export const AppBar = ({ children }: AppBarProps) => {
  return (
    <AppBarMUI position="fixed" color="primary">
      {children}
    </AppBarMUI>
  );
};
