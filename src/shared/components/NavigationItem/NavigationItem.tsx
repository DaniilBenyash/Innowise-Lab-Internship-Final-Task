import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "../Link";
import Divider from "@mui/material/Divider";

export type NavigationItemType = {
  icon: JSX.Element;
  text: string;
  link: string;
  hasDivider?: boolean;
};

export const NavigationItem = ({
  icon,
  text,
  link,
  hasDivider,
}: NavigationItemType) => {
  return (
    <>
      <Link to={link}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      </Link>
      {hasDivider && <Divider />}
    </>
  );
};
