import React, { memo } from "react";
import { EllipsisMenu, MenuItem } from "shared/components/EllipsisMenu";
import { PROFILE_PAGE } from "app/routing";
import { Link } from "shared/components/Link";
import { Avatar } from "shared/components/Avatar";
import { useTranslation } from "react-i18next";
import { TableCell, TableRow } from "shared/components/Table";
import { EmployeesTableData } from "../types";
import { useAuth } from "modules/common/utils";

type EmployeeTableRowProps = {
  row: EmployeesTableData;
  handleUpdateUser: (user: EmployeesTableData) => void;
  handleUserRemove: (user: EmployeesTableData) => void;
};
const EmployeeTableRow = memo(
  ({ row, handleUpdateUser, handleUserRemove }: EmployeeTableRowProps) => {
    const { isAdmin } = useAuth();

    const { t } = useTranslation();
    const handleUpdate = () => handleUpdateUser(row);
    const handleRemove = () => handleUserRemove(row);

    return (
      <TableRow key={row.id}>
        <TableCell width="1%">
          <Avatar
            src={row.profile.avatar}
            name={row.firstName}
            size="medium"
            alt="avatar"
          />
        </TableCell>
        <TableCell>{row.firstName}</TableCell>
        <TableCell>{row.lastName}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.departmentName}</TableCell>
        <TableCell>{row.positionName}</TableCell>
        <TableCell width="1%">
          <EllipsisMenu>
            <Link to={`${row.id}${PROFILE_PAGE}`}>
              <MenuItem>{t("user.profile")}</MenuItem>
            </Link>
            <MenuItem disabled={!isAdmin} onClick={handleUpdate}>
              {t("user.update")}
            </MenuItem>
            <MenuItem disabled={!isAdmin} onClick={handleRemove}>
              {t("user.remove")}
            </MenuItem>
          </EllipsisMenu>
        </TableCell>
      </TableRow>
    );
  },
);

EmployeeTableRow.displayName = "employeeTableRow";
export { EmployeeTableRow };
