import React, { ReactNode } from "react";
import TableRowMUI from "@mui/material/TableRow";

type TableRowProps = {
  children: ReactNode;
};

const TableRow = ({ children }: TableRowProps) => {
  return <TableRowMUI hover>{children}</TableRowMUI>;
};

export { TableRow };
