import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

export type DateFormat =
  | "MM/DD/YYYY"
  | "MMMM D, YYYY"
  | "MMMM D, YYYY h:mm A"
  | "M/D/YYYY"
  | "MMM D, YYYY"
  | "DD-MM-YYYY"
  | "YYYY-MM-DD";

export type InputDateProps = {
  onChange: (date: string) => void;
  label: string;
  dateFormat?: DateFormat;
  onClose: () => void;
  fullWidth?: boolean;
  defaultValue?: string;
  error?: boolean;
  disabled?: boolean;
};

export const InputDate = ({
  error,
  onChange,
  label,
  dateFormat = "DD-MM-YYYY",
  onClose,
  fullWidth = false,
  defaultValue,
  disabled = false,
}: InputDateProps) => {
  const handleDateChange = (date: Dayjs) => {
    onChange(date.format(dateFormat));
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disabled={disabled}
        defaultValue={defaultValue ? dayjs(defaultValue) : undefined}
        slotProps={{
          textField: {
            error: error,
          },
        }}
        label={label}
        onChange={handleDateChange}
        onClose={onClose}
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            { border: "2px solid #C63031" },
          minWidth: "320px",
          width: fullWidth ? "100%" : undefined,
        }}
      />
    </LocalizationProvider>
  );
};
