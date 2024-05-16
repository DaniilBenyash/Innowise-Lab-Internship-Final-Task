import React, { ReactNode } from "react";
import styles from "./table.module.scss";
import TableMUI from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { TableProvider } from "./TableProvider";
import { TableOrder } from "shared/hooks/useTableSorting";

type TableProps = {
  children: ReactNode;
  tableOrder: TableOrder;
  stickyHeader?: boolean;
};

const Table = ({ children, tableOrder, stickyHeader = false }: TableProps) => {
  return (
    <TableProvider tableOrder={tableOrder}>
      <TableContainer>
        <TableMUI className={styles.table} stickyHeader={stickyHeader}>
          {children}
        </TableMUI>
      </TableContainer>
    </TableProvider>
  );
};

export { Table };
