import React from "react";
import { Button as MUIButton } from "@mui/material";

type Colors = "inherit" | "primary" | "secondary" | "info";

type Variants = "text" | "outlined" | "contained";

type Types = "button" | "submit" | "reset";

type ButtonProps = {
  variant: Variants;
  color: Colors;
  children: React.ReactNode;
  type?: Types;
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  roundBorders?: boolean;
};

export const Button = ({
  disabled = false,
  variant,
  color,
  children,
  fullWidth = false,
  onClick,
  roundBorders = false,
  type = "button",
}: ButtonProps) => {
  return (
    <MUIButton
      radioGroup="20%"
      sx={roundBorders ? { borderRadius: "20px" } : undefined}
      disabled={disabled}
      onClick={onClick}
      type={type}
      fullWidth={fullWidth}
      variant={variant}
      color={color}
    >
      {children}
    </MUIButton>
  );
};
