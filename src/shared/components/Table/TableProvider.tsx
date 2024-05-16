import { TableOrder } from "shared/hooks/useTableSorting";
import React, { ReactNode, createContext, useContext } from "react";

type TableProviderProps = {
  children: ReactNode;
  tableOrder: TableOrder;
};

type Order = "asc" | "desc";

type TableContext = {
  order: Order;
  orderBy: string;
  handleRequestSort: (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => void;
  stickyHeader: boolean;
};
const stickyHeader = true;
const defaultValue: TableContext = {
  order: "asc",
  orderBy: "order",
  handleRequestSort: (event: React.MouseEvent<unknown>, property: string) => {
    return property;
  },
  stickyHeader,
};

const TableContext = createContext(defaultValue);
export const useTableContext = () => useContext<TableContext>(TableContext);

const TableProvider = ({ children, tableOrder }: TableProviderProps) => {
  const { order, orderBy, setOrder, setOrderBy } = tableOrder;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <TableContext.Provider
      value={{ order, orderBy, handleRequestSort, stickyHeader }}>
      {children}
    </TableContext.Provider>
  );
};

export { TableProvider };
