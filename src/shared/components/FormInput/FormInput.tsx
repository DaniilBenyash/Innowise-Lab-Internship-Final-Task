import React, { ReactNode } from "react";
import { Input, Colors } from "shared/components/Input";
import { useController, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Box } from "shared/components/Box";
import { P } from "../Typography";

export type FormInputProps = {
  label?: string;
  placeholder?: string;
  name: string;
  type?: "text" | "password" | "number";
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  startAdornmentPlacement?: "start" | "end";
  endAdornmentPlacement?: "start" | "end";
  required?: boolean;
  minLength?: number;
  validate?: (value: string) => string | boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  color?: Colors;
};

export const FormInput = ({
  label,
  name,
  endAdornment,
  startAdornment,
  startAdornmentPlacement,
  endAdornmentPlacement,
  type = "text",
  required = false,
  minLength = 0,
  validate,
  fullWidth,
  color,
  placeholder,
  disabled,
}: FormInputProps) => {
  const { control } = useFormContext();
  const { t } = useTranslation();
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
    <Box fullWidth={fullWidth}>
      <Input
        disabled={disabled}
        defaultValue={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        label={label}
        placeholder={placeholder}
        type={type}
        endAdornment={endAdornment}
        startAdornment={startAdornment}
        startAdornmentPlacement={startAdornmentPlacement}
        endAdornmentPlacement={endAdornmentPlacement}
        fullWidth={fullWidth}
        error={!!error}
        color={color}
      />
      <P size="small" color="error">
        {error}
      </P>
    </Box>
  );
};
