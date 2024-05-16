import React from "react";
import { useTranslation } from "react-i18next";
import { FormInput, FormInputProps } from "shared/components/FormInput";

type FormInputNameProps = Omit<FormInputProps, "type" | "validate">;

const FormInputName = (props: FormInputNameProps) => {
  const { t } = useTranslation();
  const validate = (text: string) => {
    if (!/^[A-Za-z]+$/.test(text)) {
      return t("errors.nameInput");
    }
    return true;
  };

  return <FormInput type="text" validate={validate} {...props} />;
};

export { FormInputName };
