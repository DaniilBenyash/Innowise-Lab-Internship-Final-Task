import React from "react";
import { IconButton as MUIIconButton } from "@mui/material";

type Colors = "secondary";

type IconButtonProps = {
  ariaLabel: string;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  edge?: "end" | "start";
  children: React.ReactNode;
  color?: Colors;
};

export const IconButton = ({
  ariaLabel,
  onClick,
  edge,
  children,
  color,
}: IconButtonProps) => {
  return (
    <MUIIconButton
      aria-label={ariaLabel}
      onClick={onClick}
      edge={edge}
      color={color}
    >
      {children}
    </MUIIconButton>
  );
};
