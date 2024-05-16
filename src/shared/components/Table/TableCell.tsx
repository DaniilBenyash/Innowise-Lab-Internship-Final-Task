import React, { ReactNode } from "react";
import TableCellMUI from "@mui/material/TableCell";
import styles from "./table.module.scss";

type TableCellProps = {
  children?: ReactNode;
  width?: string | number;
  align?: "right" | "left";
};

const TableCell = ({ children, width = "250px" }: TableCellProps) => {
  return (
    <TableCellMUI width={width} className={styles.tableCell}>
      {children}
    </TableCellMUI>
  );
};

export { TableCell };
