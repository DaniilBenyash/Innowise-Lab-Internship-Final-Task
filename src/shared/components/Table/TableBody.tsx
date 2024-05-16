import React, { ReactNode } from "react";
import { TableBody as TableBodyMUI } from "@mui/material";

type TableBodyProps = {
  children: ReactNode;
};

const TableBody = ({ children }: TableBodyProps) => {
  return <TableBodyMUI>{children}</TableBodyMUI>;
};

export { TableBody };
