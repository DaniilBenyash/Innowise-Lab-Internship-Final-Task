import { useGetDepartments } from "modules/common/hooks";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  FormSelectInput,
  FormSelectInputProps,
} from "shared/components/FormSelectInput";
import { Loader } from "shared/components/Loader";

type FormDepartmentSelectInputProps = Omit<
  FormSelectInputProps,
  "title" | "values"
>;

const FormDepartmentSelectInput = (props: FormDepartmentSelectInputProps) => {
  const { departments, loading } = useGetDepartments();
  const { t } = useTranslation();
  
  const resultDepartments = useMemo(
    () =>
      departments.map(department => {
        return {
          value: department.id,
          label: department.name,
        };
      }),
    [loading],
  );
  
  if (loading) {
    return <Loader />;
  }

  return (
    <FormSelectInput
      title={t("input.department")}
      values={resultDepartments}
      {...props}
    />
  );
};

export { FormDepartmentSelectInput };
