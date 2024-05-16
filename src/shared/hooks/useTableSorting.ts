import { useMemo, useState } from "react";
type Order = "asc" | "desc";

export type TableOrder = {
  order: Order;
  orderBy: string;
  setOrder: (value: Order) => void;
  setOrderBy: (value: string) => void;
};

const getSortingValue = <ITERATION_OBJECT extends object>(
  iterationObject: ITERATION_OBJECT,
  key: string,
): string => {
  if (key in iterationObject) {
    return iterationObject[key as keyof typeof iterationObject] as string;
  }

  return Object.values(iterationObject).reduce((accumulator, sortingValue) => {
    if (accumulator !== undefined) return accumulator;
    if (typeof sortingValue === "object")
      return getSortingValue(sortingValue, key);
  }, undefined);
};

const sortCell = (firstCell: string, secondCell: string) => {
  const collator = new Intl.Collator("en-EN");

  if (Number(firstCell && Number(secondCell))) {
    return Number(firstCell) - Number(secondCell);
  }
  return collator.compare(firstCell, secondCell);
};

const useTableSorting = <ROW extends object>(defaultTableRows: ROW[]) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("");

  const tableRows = useMemo(() => {
    if (!orderBy || !defaultTableRows.length) {
      return defaultTableRows;
    }

    return [...defaultTableRows].sort((firstCell, secondeCell) => {
      return order === "desc"
        ? sortCell(
            getSortingValue(firstCell, orderBy),
            getSortingValue(secondeCell, orderBy),
          )
        : sortCell(
            getSortingValue(secondeCell, orderBy),
            getSortingValue(firstCell, orderBy),
          );
    });
  }, [order, orderBy, defaultTableRows]);

  const tableOrder: TableOrder = {
    order,
    orderBy,
    setOrder,
    setOrderBy,
  };
  return { tableRows, tableOrder };
};

export { useTableSorting };
