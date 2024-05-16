import React from "react";
import { FormInput, FormInputProps } from "shared/components/FormInput";
import { useTranslation } from "react-i18next";

type FormInputEmailProps = Omit<
  FormInputProps,
  "type" | "required" | "validate"
>;

export const FormInputEmail = (props: FormInputEmailProps) => {
  const { t } = useTranslation();
  const validate = (email: string) => {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email,
      )
    ) {
      return t("errors.emailInput");
    }
    return true;
  };

  return <FormInput type="text" required validate={validate} {...props} />;
};
