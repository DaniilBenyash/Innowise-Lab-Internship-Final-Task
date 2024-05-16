import React, { ReactNode } from "react";
import BadgeMUI from "@mui/material/Badge";

type BadgeProps = {
  badge: ReactNode;
  children: ReactNode;
  badgePlacement: "rectangular" | "circular";
  verticalBadgePlacement: "top" | "bottom";
  horizontalBadgePlacement: "left" | "right";
};

const Badge = ({
  badge,
  badgePlacement,
  verticalBadgePlacement,
  horizontalBadgePlacement,
  children,
}: BadgeProps) => {
  return (
    <BadgeMUI
      overlap={badgePlacement}
      anchorOrigin={{
        vertical: verticalBadgePlacement,
        horizontal: horizontalBadgePlacement,
      }}
      badgeContent={badge}
    >
      {children}
    </BadgeMUI>
  );
};

export { Badge };
