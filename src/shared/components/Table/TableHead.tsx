import React, { ReactNode } from "react";
import TableHeadMUI from "@mui/material/TableHead";
import styles from "./table.module.scss";
import classNames from "classnames";
import { useTableContext } from "./TableProvider";

type TableHeadProps = {
  children: ReactNode;
};

const TableHead = ({ children }: TableHeadProps) => {
  const { stickyHeader } = useTableContext();
  const tableHeadClass = classNames(styles.tableHead, {
    [styles.tableHeadPrimary]: stickyHeader,
  });
  return <TableHeadMUI className={tableHeadClass}>{children}</TableHeadMUI>;
};

export { TableHead };
