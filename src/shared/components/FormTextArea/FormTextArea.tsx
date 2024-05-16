import React from "react";
import { TextArea, TextAreaProps } from "shared/components/TextArea";
import { useController, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Box } from "shared/components/Box";
import { P } from "shared/components/Typography";

type FormTextAreaProps = Omit<
  TextAreaProps,
  "onChange" | "onBlue" | "error" | "defaultValue"
> & {
  name: string;
  required?: boolean;
  minLength?: number;
  validate?: (value: string) => string | boolean;
  registerName?: string;
};

const FormTextArea = ({
  name,
  required = false,
  minLength = 0,
  validate,
  ...props
}: FormTextAreaProps) => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name: name,
    rules: {
      required: required ? t("errors.emptyInput") : undefined,
      minLength: {
        value: minLength,
        message: t("errors.lengthInput"),
      },
      validate: validate,
    },
  });
  const error = fieldState.error?.message;

  return (
    <Box fullWidth>
      <TextArea
        defaultValue={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        error={!!error}
        {...props}
      />
      <P size="small" color="error">
        {error}
      </P>
    </Box>
  );
};

export { FormTextArea };
