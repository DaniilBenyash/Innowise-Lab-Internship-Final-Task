import React, { ChangeEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Input } from "shared/components/Input";

type InputSearchProps = {
  onChange: (text: string) => void;
  value: string;
  placeholder: string;
  size?: "small" | "medium";
};

const InputSearch = ({
  onChange,
  value,
  placeholder,
  size,
}: InputSearchProps) => {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(event.target.value);
  };
  return (
    <Input
      size={size}
      type="text"
      onChange={handleChange}
      value={value}
      startAdornment={<SearchIcon color="disabled" />}
      placeholder={placeholder}
      startAdornmentPlacement="start"
    />
  );
};

export { InputSearch };
