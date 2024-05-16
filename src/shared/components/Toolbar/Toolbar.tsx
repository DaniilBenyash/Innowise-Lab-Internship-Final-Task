import React, { ReactNode, useMemo } from "react";
import styles from "./Toolbar.module.scss";
import { Toolbar as ToolbarMUI } from "@mui/material";
import classNames from "classnames";

type AlignItems = "center" | "flex-start" | "flex-end" | "stretch";
type JustifyContent = "center" | "flex-start" | "flex-end" | "space-between";
type Types = "primary" | "secondary";

type ToolbarProps = {
  children: ReactNode;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  type?: Types;
};

export const Toolbar = ({
  children,
  alignItems,
  justifyContent,
  type,
}: ToolbarProps) => {
  const toolbarStyles = useMemo(
    () => ({
      alignItems: alignItems,
      justifyContent: justifyContent,
    }),
    [],
  );

  const toolbarClass = classNames({
    [styles.toolbarPrimary]: type === "primary",
  });

  return (
    <ToolbarMUI style={toolbarStyles} className={toolbarClass}>
      {children}
    </ToolbarMUI>
  );
};
