import React from "react";
import { Box as MUIBox } from "@mui/material";

type BoxProps = {
  fullWidth?: boolean;
  children: React.ReactNode;
  paddingTop?: number;
  paddingButton?: number;
  paddingX?: number;
  paddingY?: number;
  padding?: number;
  paddingLeft?: number;
  paddingRight?: number;
  position?: "fixed" | 'sticky';
  top?: number;
  backgroundColor?: string;
};

export const Box = ({
  fullWidth,
  children,
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingButton,
  paddingLeft,
  paddingRight,
  position,
  top,
  backgroundColor,
}: BoxProps) => {
  return (
    <MUIBox
      width={fullWidth ? "100%" : undefined}
      padding={padding ? `${padding}px` : undefined}
      paddingX={paddingX ? `${paddingX}px` : undefined}
      paddingY={paddingY ? `${paddingY}px` : undefined}
      paddingLeft={paddingLeft ? `${paddingLeft}px` : undefined}
      paddingRight={paddingRight ? `${paddingRight}px` : undefined}
      paddingTop={paddingTop ? `${paddingTop}px` : undefined}
      paddingBottom={paddingButton ? `${paddingButton}px` : undefined}
      top={top ? `${top}px` : undefined}
      position={position}
      zIndex={5}
      sx={{ backgroundColor: backgroundColor }}>
      {children}
    </MUIBox>
  );
};
