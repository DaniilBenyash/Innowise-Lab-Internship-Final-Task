import React, { ReactNode, useDeferredValue, useState } from "react";
import { TableOrder, useTableSorting } from "shared/hooks/useTableSorting";
import { debounce } from "shared/utils";
import { FlexLayout } from "shared/components/FlexLayout";
import { InputSearch } from "shared/components/InputSearch";
import { useTranslation } from "react-i18next";
import { Box } from "../Box";

type SearchableTableProps<ROW extends object> = {
  tableData: ROW[];
  children: ReactNode;
  tableComponent: (rows: ROW[], tableOrder: TableOrder) => ReactNode;
  searchByColumn: keyof ROW;
};

const SearchableTable = <ROW extends object>({
  tableData,
  tableComponent,
  children,
  searchByColumn,
}: SearchableTableProps<ROW>) => {
  const [table, setTable] = useState<ROW[]>(tableData);
  const { tableOrder, tableRows } = useTableSorting(table);
  const resultTable = useDeferredValue(tableRows);
  const [searchName, setSearchName] = useState("");
  const { t } = useTranslation();
  const onChange = (text: string) => {
    setSearchName(text);
    const debounceSearch = debounce(() => {
      if (!text) {
        return setTable(tableData);
      }
      const resultTable = tableRows.filter(row => {
        if (row[searchByColumn]) {
          return (row[searchByColumn] as string)
            .toLowerCase()
            .includes(searchName.toLowerCase());
        }
      });
      setTable(resultTable);
    });

    debounceSearch();
  };
  return (
    <>
      <Box position="sticky" top={108} paddingY={10} fullWidth backgroundColor="#f5f5f7">
        <FlexLayout direction="row" justifyContent="space-between">
          <InputSearch
            size="small"
            value={searchName}
            onChange={onChange}
            placeholder={t("input.search")}
          />
          {children}
        </FlexLayout>
      </Box>
      {tableComponent(resultTable, tableOrder)}
    </>
  );
};

export { SearchableTable };
