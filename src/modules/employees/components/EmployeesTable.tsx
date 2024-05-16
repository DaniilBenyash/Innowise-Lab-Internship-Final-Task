import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "shared/components/Table";
import { TableOrder } from "shared/hooks/useTableSorting";
import { EmployeeTableRow } from "./EmployeeTableRow";
import { ManageModalEmployee } from "./ManageModalEmployee";
import { ConfirmationModal } from "shared/components/ConfirmationModal";
import { FormSubmitHandler } from "react-hook-form";
import {
  EmployeesTableData,
  RequestedUser,
  UpdateUser,
} from "modules/employees/types";
import { InitialValue } from "../types/";

type EmployeesTableProps = {
  rows: EmployeesTableData[];
  tableOrder: TableOrder;
  handleRequestUpdateUser: (id: string, user: UpdateUser) => void;
  handleRequestDeleteUser: (id: string) => void;
};

const EmployeesTable = ({
  tableOrder,
  rows,
  handleRequestDeleteUser,
  handleRequestUpdateUser,
}: EmployeesTableProps) => {
  const [user, setUser] = useState<EmployeesTableData>();
  const [isOpenUpdateModal, setUpdateModalVisibility] = useState(false);
  const [isOpenRemoveModal, setRemoveModalVisibility] = useState(false);
  const { t } = useTranslation();

  const handleUserUpdateModalVisibility = () => {
    setUpdateModalVisibility(visibility => !visibility);
  };

  const handleUserRemoveModalVisibility = () => {
    setRemoveModalVisibility(visibility => !visibility);
  };

  const initialValues: InitialValue = {
    email: user?.email,
    password: "password1",
    name: user?.firstName,
    surname: user?.lastName,
    department: user?.department?.id,
    position: user?.position?.id,
    role: user?.role,
  };

  const handleUpdateUser = useCallback((user: EmployeesTableData) => {
    setUser(user);
    handleUserUpdateModalVisibility();
  }, []);

  const handleUserRemove = useCallback((user: EmployeesTableData) => {
    setUser(user);
    handleUserRemoveModalVisibility();
  }, []);

  const handleRequestUserRemove = () => {
    handleRequestDeleteUser(user?.id);
    handleUserRemoveModalVisibility();
  };

  const handleUserUpdate: FormSubmitHandler<RequestedUser> = ({ data }) => {
    handleRequestUpdateUser(user.id, {
      ...data,
      skills: user.profile.skills,
      languages: user.profile.languages,
      cvsId: user.cvsId,
    });
    handleUserUpdateModalVisibility();
  };

  return (
    <>
      {user && (
        <>
          <ManageModalEmployee
            handleSubmit={handleUserUpdate}
            isOpen={isOpenUpdateModal}
            handleClose={handleUserUpdateModalVisibility}
            initialValues={initialValues}
            user={user}
            title={t("user.update")}
            buttonTitle={t("formModal.update")}
          />
          <ConfirmationModal
            description={t("user.alertAgree")}
            confirmationText={`${user?.profile?.fullName}?`}
            isOpen={isOpenRemoveModal}
            title={t("user.remove")}
            handleClose={handleUserRemoveModalVisibility}
            handleRequest={handleRequestUserRemove}
          />
        </>
      )}

      <Table tableOrder={tableOrder} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <TableSortLabel sortingValue="firstName">
                {t("input.name")}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel sortingValue="lastName">
                {t("input.surname")}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel sortingValue="email">
                {t("authPage.email")}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel sortingValue="departmentName">
                {t("input.department")}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel sortingValue="positionName">
                {t("input.position")}
              </TableSortLabel>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <EmployeeTableRow
                key={row.id}
                row={row}
                handleUpdateUser={handleUpdateUser}
                handleUserRemove={handleUserRemove}
              />
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export { EmployeesTable };
