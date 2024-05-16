import React from "react";
import styles from "./Select.module.scss";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select as SelectMUI, SelectChangeEvent } from "@mui/material";

type SelectInputProps = {
  values: string[];
  onChange: (value: string) => void;
  defaultValue?: string;
};

export const Select = ({
  values,
  defaultValue = "",
  onChange,
}: SelectInputProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl>
      <SelectMUI
        onChange={handleChange}
        defaultValue={defaultValue}
        variant="standard"
        className={styles.select}
      >
        {values.map(value => (
          <MenuItem value={value} key={value}>
            {value.toUpperCase()}
          </MenuItem>
        ))}
      </SelectMUI>
    </FormControl>
  );
};
