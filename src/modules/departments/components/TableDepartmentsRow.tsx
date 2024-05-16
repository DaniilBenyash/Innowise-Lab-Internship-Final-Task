import React from "react";
import { MenuDepartment } from "./MenuDepartment";
import { P } from "shared/components/Typography";
import { TableCell, TableRow } from "shared/components/Table";
import { Department } from "modules/common/types";

type TableDepartmentsRowProps = {
  row: Department;
  handleUpdateDepartment: (id: string, name: string) => void;
  handleDeleteDepartment: (id: string) => void;
};

const TableDepartmentsRow = ({
  row,
  handleUpdateDepartment,
  handleDeleteDepartment,
}: TableDepartmentsRowProps) => {
  return (
    <TableRow key={row.id}>
      <TableCell width="100%">
        <P size="medium">{row.name}</P>
      </TableCell>
      <TableCell>
        <MenuDepartment
          department={row}
          handleUpdateDepartment={handleUpdateDepartment}
          handleDeleteDepartment={handleDeleteDepartment}
        />
      </TableCell>
    </TableRow>
  );
};

export { TableDepartmentsRow };
