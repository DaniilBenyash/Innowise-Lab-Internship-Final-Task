import React from "react";
import {
  SelectInput,
  Variants,
  Colors,
  Types,
} from "shared/components/SelectInput";
import { useController, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Box } from "../Box";
import { P } from "../Typography";

export type FormSelectInputProps = {
  name: string;
  title?: string;
  values: { value: string | number; label: string }[];
  required?: boolean;
  variant?: Variants;
  color?: Colors;
  type?: Types;
  fullWidth?: boolean;
  disabled?: boolean;
};

const FormSelectInput = ({
  name,
  title,
  values,
  required = false,
  variant,
  color,
  type,
  fullWidth,
  disabled,
}: FormSelectInputProps) => {
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
    <Box fullWidth={fullWidth}>
      <SelectInput
        disabled={disabled}
        title={title}
        values={values}
        defaultValue={field.value}
        onChange={field.onChange}
        onClose={field.onBlur}
        error={!!error}
        variant={variant}
        color={color}
        type={type}
        fullWidth={fullWidth}
      />
      <P size="small" color="error">
        {error}
      </P>
    </Box>
  );
};

export { FormSelectInput };
