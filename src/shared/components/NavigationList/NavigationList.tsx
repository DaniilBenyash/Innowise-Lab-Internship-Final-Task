import React from "react";
import List from "@mui/material/List";
import { NavigationItem, NavigationItemType } from "../NavigationItem";

type NavigationListProps = {
  list: NavigationItemType[];
  onClick: () => void;
};

export const NavigationList = ({ list, onClick }: NavigationListProps) => {
  return (
    <List onClick={onClick}>
      {list.map(item => {
        return (
          <NavigationItem
            key={item.text}
            icon={item.icon}
            text={item.text}
            link={item.link}
            hasDivider={item.hasDivider}
          />
        );
      })}
    </List>
  );
};
