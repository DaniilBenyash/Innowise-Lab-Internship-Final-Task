import React, { ReactNode } from "react";
import MenuItemMUI from "@mui/material/MenuItem";

type MenuItemProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const MenuItem = ({ children, onClick, disabled = false }: MenuItemProps) => {
  return (
    <MenuItemMUI disabled={disabled} onClick={onClick}>
      {children}
    </MenuItemMUI>
  );
};

export { MenuItem };
