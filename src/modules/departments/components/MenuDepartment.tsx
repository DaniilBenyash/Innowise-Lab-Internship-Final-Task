import React, { useState } from "react";
import { EllipsisMenu, MenuItem } from "shared/components/EllipsisMenu";
import { ManageModalDepartment } from "./ManageModalDepartment";
import { useTranslation } from "react-i18next";
import { Department } from "modules/common/types";
import { FormSubmitHandler } from "react-hook-form";
import { RequestedDepartment } from "../hooks";
import { ConfirmationModal } from "shared/components/ConfirmationModal";
import { useAuth } from "modules/common/utils";

type MenuDepartmentProps = {
  department: Department;
  handleUpdateDepartment: (id: string, name: string) => void;
  handleDeleteDepartment: (id: string) => void;
};

export const MenuDepartment = ({
  department,
  handleUpdateDepartment,
  handleDeleteDepartment,
}: MenuDepartmentProps) => {
  const { t } = useTranslation();
  const [isOpenUpdateModal, setUpdateModalVisibility] = useState(false);
  const [isOpenRemoveModal, setRemoveModalVisibility] = useState(false);

  const { isAdmin } = useAuth();

  const handleDepartmentUpdateModalVisibility = () => {
    setUpdateModalVisibility(visibility => !visibility);
  };

  const handleDepartmentDeleteModalVisibility = () => {
    setRemoveModalVisibility(visibility => !visibility);
  };

  const handleRequestDeleteDepartment = () => {
    handleDeleteDepartment(department.id);
  };

  const initialValue = {
    name: department.name,
  };

  const handleRequestUpdateDepartment: FormSubmitHandler<
    RequestedDepartment
  > = ({ data }) => {
    handleUpdateDepartment(department.id, data.name);
  };

  return (
    <>
      <EllipsisMenu>
        <MenuItem
          disabled={!isAdmin}
          onClick={handleDepartmentUpdateModalVisibility}
        >
          {t("departmentsPage.updateDepartment")}
        </MenuItem>
        <MenuItem
          disabled={!isAdmin}
          onClick={handleDepartmentDeleteModalVisibility}
        >
          {t("departmentsPage.deleteDepartment")}
        </MenuItem>
      </EllipsisMenu>
      <ManageModalDepartment
        isOpen={isOpenUpdateModal}
        handleClose={handleDepartmentUpdateModalVisibility}
        variant="update"
        initialValue={initialValue}
        handleSubmit={handleRequestUpdateDepartment}
      />
      <ConfirmationModal
        isOpen={isOpenRemoveModal}
        handleClose={handleDepartmentDeleteModalVisibility}
        title={t("departmentsPage.deleteDepartment")}
        description={t("departmentsPage.confirmation")}
        confirmationText={department.name}
        handleRequest={handleRequestDeleteDepartment}
      />
    </>
  );
};
