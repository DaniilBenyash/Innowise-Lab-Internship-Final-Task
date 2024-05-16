import React from "react";
import { FormSubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormModal } from "shared/components/FormModal";
import { FormInput } from "shared/components/FormInput";

type Variants = "update" | "create";

type ManageModalDepartmentProps<VALUE> = {
  isOpen: boolean;
  handleClose: () => void;
  variant: Variants;
  initialValue: VALUE;
  handleSubmit: FormSubmitHandler<VALUE>;
};

export const ManageModalDepartment = <VALUE,>({
  isOpen,
  handleClose,
  variant,
  initialValue,
  handleSubmit,
}: ManageModalDepartmentProps<VALUE>) => {
  const { t } = useTranslation();

  return (
    <FormModal
      title={t(`departmentsPage.${variant}Department`)}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      confirmButtonTitle={t(`departmentsPage.${variant}`)}
      handleClose={handleClose}
      initialValues={initialValue}
    >
      <FormInput
        required
        fullWidth
        name="name"
        label={t("departmentsPage.department")}
      />
    </FormModal>
  );
};
