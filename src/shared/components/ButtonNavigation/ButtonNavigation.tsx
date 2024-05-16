import React, { ReactNode } from "react";
import styles from "./ButtonNavigation.module.scss";
import { Link } from "../Link";
import classNames from "classnames";
import { useMatch } from "react-router";
import { Button } from "@mui/material";

type ButtonNavigationProps = {
  children: ReactNode;
  to: string;
};

export const ButtonNavigation = ({
  children,
  to,
}: ButtonNavigationProps): JSX.Element => {
  const match = useMatch(to);

  const classButtonNavigation = classNames(styles.link, {
    [styles.linkSelected]: match,
    [styles.linkNotSelected]: !match,
  });

  return (
    <Link to={to}>
      <div className={classButtonNavigation}>
        <Button color="inherit" className={classButtonNavigation}>
          {children}
        </Button>
      </div>
    </Link>
  );
};
