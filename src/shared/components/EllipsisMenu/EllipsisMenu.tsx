import React, { ReactNode } from "react";
import MenuMUI from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "shared/components/IconButton";

type EllipsisMenuProps = {
  icon?: ReactNode;
  children: ReactNode;
  menuStyles?: string;
};

const EllipsisMenu = ({
  icon = <MoreVertIcon color="action" />,
  children,
  menuStyles,
}: EllipsisMenuProps) => {
  const [anchorItem, setAnchorItem] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorItem);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorItem(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorItem(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} ariaLabel="ellipsis-menu">
        {icon}
      </IconButton>
      <MenuMUI
        PaperProps={{
          classes: { root: menuStyles },
        }}
        id="long-menu"
        anchorEl={anchorItem}
        open={open}
        onClick={handleClose}>
        {children}
      </MenuMUI>
    </>
  );
};

export { EllipsisMenu };
