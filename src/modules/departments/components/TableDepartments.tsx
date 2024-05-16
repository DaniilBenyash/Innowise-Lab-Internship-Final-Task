import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
} from "shared/components/Table";
import { TableOrder } from "shared/hooks/useTableSorting";
import { useTranslation } from "react-i18next";
import { Department } from "modules/common/types";
import { TableDepartmentsRow } from "./TableDepartmentsRow";

type TableDepartmentsProps = {
  rows: Department[];
  tableOrder: TableOrder;
  handleUpdateDepartment: (id: string, name: string) => void;
  handleDeleteDepartment: (id: string) => void;
};

export const TableDepartments = ({
  rows,
  tableOrder,
  handleDeleteDepartment,
  handleUpdateDepartment,
}: TableDepartmentsProps) => {
  const { t } = useTranslation();

  return (
    <Table tableOrder={tableOrder} stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel sortingValue="name">
              {t("departmentsPage.department")}
            </TableSortLabel>
          </TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableDepartmentsRow
            key={row.id}
            row={row}
            handleDeleteDepartment={handleDeleteDepartment}
            handleUpdateDepartment={handleUpdateDepartment}
          />
        ))}
      </TableBody>
    </Table>
  );
};
