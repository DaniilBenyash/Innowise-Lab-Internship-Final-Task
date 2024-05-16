import React from "react";
import { InputDate, InputDateProps } from "shared/components/InputDate";
import { P } from "shared/components/Typography";
import { useController, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Box } from "shared/components/Box";

type FormSelectInputDateProps = Omit<
  InputDateProps,
  "onChange" | "onClose" | "defaultValue" | "error"
> & {
  name: string;
  required: boolean;
};

const FormSelectInputDate = ({
  required = false,
  name,
  ...props
}: FormSelectInputDateProps) => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name: name,
    rules: {
      required: required ? t("errors.emptyInput") : undefined,
    },
  });
  const error = fieldState.error?.message;

  return (
    <Box fullWidth>
      <InputDate
        onChange={field.onChange}
        onClose={field.onBlur}
        defaultValue={field.value}
        error={!!error}
        {...props}
      />
      {error && (
        <P size="small" color="error">
          {error}
        </P>
      )}
    </Box>
  );
};

export { FormSelectInputDate };
