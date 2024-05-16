import React, { ReactNode } from "react";
import TableSortLabelMUI from "@mui/material/TableSortLabel";
import { useTableContext } from "./TableProvider";

type TableSortLabelProps = {
  children: ReactNode;
  sortingValue: string;
};

const TableSortLabel = ({ sortingValue, children }: TableSortLabelProps) => {
  const { order, orderBy, handleRequestSort } = useTableContext();

  const handlerSortCreate =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  return (
    <TableSortLabelMUI
      direction={orderBy === sortingValue ? order : "asc"}
      onClick={handlerSortCreate(sortingValue)}
    >
      {children}
    </TableSortLabelMUI>
  );
};

export { TableSortLabel };
