import React, { ChangeEvent, ReactNode } from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";

export type Colors =
  | "primary"
  | "secondary"
  | "info"
  | "error"
  | "success"
  | "warning";

type InputDefaultProps = {
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "number";
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: () => void;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  fullWidth?: boolean;
  error?: boolean;
  color?: Colors;
  value?: string;
  defaultValue?: string;
  startAdornmentPlacement?: "start" | "end";
  endAdornmentPlacement?: "start" | "end";
  disabled?: boolean;
  size?: "small" | "medium";
};

type TextAreaProps =
  | { multiline?: false; rows?: never }
  | { multiline: true; rows: number };

export type InputProps = InputDefaultProps & TextAreaProps;

export const Input = ({
  onChange,
  onBlur,
  label,
  type = "text",
  endAdornment,
  startAdornment,
  fullWidth = false,
  error,
  color = "secondary",
  placeholder,
  value,
  defaultValue,
  startAdornmentPlacement,
  endAdornmentPlacement,
  disabled = false,
  size = "medium",
  rows = 1,
  multiline = false,
}: InputProps) => {
  return (
    <TextField
      disabled={disabled}
      size={size}
      defaultValue={defaultValue}
      type={type}
      fullWidth={fullWidth}
      variant="outlined"
      onChange={onChange}
      onBlur={onBlur}
      color={color}
      error={error}
      label={label}
      value={value}
      placeholder={placeholder}
      multiline={multiline}
      rows={rows}
      sx={{ minWidth: "320px" }}
      InputProps={{
        endAdornment: endAdornment && (
          <InputAdornment position={endAdornmentPlacement}>
            {endAdornment}
          </InputAdornment>
        ),
        startAdornment: startAdornment && (
          <InputAdornment position={startAdornmentPlacement}>
            {startAdornment}
          </InputAdornment>
        ),
      }}
    />
  );
};
