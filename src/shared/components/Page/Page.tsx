import React, { ReactNode } from "react";
import styles from "./Page.module.scss";
import classNames from "classnames";

type Types = "default" | "small";

type PageProps = {
  children: ReactNode;
  isCentered?: boolean;
  isCenteredX?: boolean;
  type?: Types;
};

export const Page = ({
  children,
  isCentered,
  type = "default",
  isCenteredX,
}: PageProps) => {
  const classPage = classNames(styles.page, {
    [styles.centeredPage]: isCentered,
    [styles.centeredPageX]: isCenteredX,
  });
  const classSection = classNames({
    [styles.sectionSmall]: type === "small",
    [styles.sectionDefault]: type === "default",
  });
  return (
    <main className={classPage}>
      <section className={classSection}>{children}</section>
    </main>
  );
};
