import React, { ReactNode } from "react";
import { Drawer as DrawerMUI } from "@mui/material";

type Positions = "top" | "left" | "bottom" | "right";

type DrawerProps = {
  position?: Positions;
  isOpened: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Drawer = ({
  position = "left",
  isOpened,
  onClose,
  children,
}: DrawerProps) => {
  return (
    <DrawerMUI anchor={position} open={isOpened} onClose={onClose}>
      {children}
    </DrawerMUI>
  );
};
