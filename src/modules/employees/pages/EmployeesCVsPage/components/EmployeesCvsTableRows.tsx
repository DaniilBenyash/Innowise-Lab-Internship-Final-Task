import { CV } from "modules/common/types/types";
import React from "react";
import { useTranslation } from "react-i18next";
import { EllipsisMenu, MenuItem } from "shared/components/EllipsisMenu";
import { TableRow, TableCell } from "shared/components/Table";

type EmployeesCvsTableRowsProps = {
  row: CV;
  handleUpdateCV: (cv: CV) => void;
  handleUnassignCV: (cv: CV) => void;
};

const EmployeesCvsTableRows = ({
  row,
  handleUpdateCV,
  handleUnassignCV,
}: EmployeesCvsTableRowsProps) => {
  const { t } = useTranslation();

  const handleUpdate = () => {
    handleUpdateCV(row);
  };

  const handleUnassign = () => {
    handleUnassignCV(row);
  };

  return (
    <TableRow key={row.id}>
      <TableCell>{row.name}</TableCell>
      <TableCell width="1%">
        <EllipsisMenu>
          <MenuItem onClick={handleUpdate}>
            {t("CVDetailsPage.updateCV")}
          </MenuItem>
          <MenuItem onClick={handleUnassign}>
            {t("CVDetailsPage.unassign")}
          </MenuItem>
        </EllipsisMenu>
      </TableCell>
    </TableRow>
  );
};

export { EmployeesCvsTableRows };
