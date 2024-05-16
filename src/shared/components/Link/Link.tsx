import React from "react";
import LinkMUI from "@mui/material/Link";
import styles from "./Link.module.scss";
import classNames from "classnames";
import { Link as LinkRouter } from "react-router-dom";

type LinkProps = {
  to: string;
  children: React.ReactNode;
  underline?: Underline;
  color?: Colors;
  disabled?: boolean;
};

type Colors = "inherit" | "primary" | "secondary" | "error" | "info";
type Underline = "hover" | "none" | "always";

const Link = ({
  to,
  disabled = false,
  children,
  underline = "none",
  color = "inherit",
}: LinkProps) => {
  const stylesLink = classNames({
    [styles.disabled]: disabled,
  });
  return (
    <LinkMUI
      underline={underline}
      color={disabled ? "primary" : color}
      className={stylesLink}
    >
      <LinkRouter className={styles.link} to={to}>
        {children}
      </LinkRouter>
    </LinkMUI>
  );
};

export { Link };
