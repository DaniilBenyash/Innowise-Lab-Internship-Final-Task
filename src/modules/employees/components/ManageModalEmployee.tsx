import React from "react";
import { FormSubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FlexLayout } from "shared/components/FlexLayout";
import { FormInputEmail } from "shared/components/FormInputEmail";
import { FormInputName } from "shared/components/FormInputName/FormInputName";
import { FormInputPassword } from "shared/components/FormInputPassword";
import { FormModal } from "shared/components/FormModal";
import { FormSelectInput } from "shared/components/FormSelectInput";
import { EmployeesTableData } from "modules/employees/types";
import { FormDepartmentSelectInput } from "modules/common/components/FormDepartmentSelectInput";
import { FormPositionSelectInput } from "modules/common/components/FormPositionSelectInput";

type ManageModalEmployeeProps<VALUE> = {
  isOpen: boolean;
  handleClose: () => void;
  initialValues?: VALUE;
  handleSubmit: FormSubmitHandler<VALUE>;
  user?: EmployeesTableData;
  title: string;
  buttonTitle: string;
};

const ManageModalEmployee = <VALUE,>({
  isOpen,
  handleClose,
  initialValues,
  handleSubmit,
  user,
  title,
  buttonTitle,
}: ManageModalEmployeeProps<VALUE>) => {
  const { t } = useTranslation();

  const roles = [
    { value: "Admin", label: "Admin" },
    { value: "Employee", label: "Employee" },
  ];

  return (
    <FormModal
      modalSize="medium"
      title={title}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      confirmButtonTitle={buttonTitle}
      handleClose={handleClose}
      initialValues={initialValues}
    >
      <FlexLayout alginItems="flex-start" spacing="sections" direction="row">
        <FlexLayout spacing="sections" justifyContent="center" fullWidth>
          <FormInputEmail
            label={t("authPage.email")}
            name="email"
            disabled={!!user}
            fullWidth
          />
          <FormInputName
            name="name"
            label={t("input.name")}
            required
            fullWidth
          />
          <FormDepartmentSelectInput name="department" required fullWidth />

          <FormSelectInput
            name="role"
            title={t("input.role")}
            values={roles}
            required
            fullWidth
          />
        </FlexLayout>
        <FlexLayout alginItems="stretch" spacing="sections" fullWidth>
          <FormInputPassword
            label={t("authPage.password")}
            name="password"
            hasIcon={false}
            disabled={!!user}
            fullWidth
          />
          <FormInputName
            name="surname"
            label={t("input.surname")}
            required
            fullWidth
          />
          <FormPositionSelectInput name="position" required fullWidth />
        </FlexLayout>
      </FlexLayout>
    </FormModal>
  );
};

export { ManageModalEmployee };
