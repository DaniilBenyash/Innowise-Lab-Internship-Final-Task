import React from "react";
import styles from "./SelectInput.module.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import classNames from "classnames";

type Variants = "outlined" | "standard";

type Colors =
  | "primary"
  | "secondary"
  | "info"
  | "error"
  | "success"
  | "warning";

type Types = "default" | "primary";

type SelectInputProps = {
  title?: string;
  values: { value: string | number; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  onClose?: () => void;
  fullWidth?: boolean;
  defaultValue?: string;
  error?: boolean;
  variant?: Variants;
  minWidth?: boolean;
  color?: Colors;
  type?: Types;
  disabled?: boolean;
};

const SelectInput = ({
  title,
  values,
  defaultValue = "",
  onChange,
  onClose,
  fullWidth = false,
  error,
  variant = "outlined",
  color = "secondary",
  type = "default",
  disabled = false,
  value,
}: SelectInputProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  const selectClass = classNames({
    [styles.selectDefault]: type === "default",
    [styles.selectPrimary]: type === "primary",
  });

  return (
    <FormControl
      disabled={disabled}
      error={error}
      color={color}
      variant={variant}
      className={selectClass}
      fullWidth={fullWidth}
    >
      {title && <InputLabel>{title}</InputLabel>}
      <Select
        label={title}
        onChange={handleChange}
        onClose={onClose}
        defaultValue={defaultValue}
        type="submit"
        className={selectClass}
        value={value}
      >
        {values.map(value => (
          <MenuItem value={value.value} key={value.value}>
            {value.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { SelectInput, Variants, Colors, Types };
