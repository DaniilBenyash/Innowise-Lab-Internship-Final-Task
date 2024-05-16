import React, { ElementType } from "react";
import { Typography as TypographyMUI } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

type Colors =
  | "inherit"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "darkgrey";
type Size = "small" | "medium" | "large";
type TextAlign = "center" | "inherit" | "justify" | "left" | "right";
type FontWeight = "light" | "regular" | "bold";

type TypographyProps = {
  variant: Variant;
  component: ElementType;
  children: string;
  textAlign?: TextAlign;
  upperCase?: boolean;
  color?: Colors;
  fontWeight?: FontWeight;
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
};

type CustomTypographyProps = Omit<TypographyProps, "variant" | "component">;
type PProps = { size: Size } & CustomTypographyProps;

const fontWeights: Record<FontWeight, number> = {
  light: 300,
  regular: 400,
  bold: 600,
};
const sizes: Record<Size, Variant> = {
  small: "caption",
  medium: "body2",
  large: "body1",
};

const Typography = ({
  variant,
  component,
  children,
  textAlign,
  upperCase,
  color,
  fontWeight,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
}: TypographyProps) => {
  return (
    <TypographyMUI
      variant={variant}
      component={component}
      textAlign={textAlign}
      color={color}
      fontWeight={fontWeights[fontWeight]}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginRight={marginRight}
      marginLeft={marginLeft}
    >
      {upperCase ? children.toUpperCase() : children}
    </TypographyMUI>
  );
};

const H4 = (props: CustomTypographyProps) => {
  return (
    <Typography variant="h4" component="h4" {...props}>
      {props.children}
    </Typography>
  );
};

const H5 = (props: CustomTypographyProps) => {
  return (
    <Typography variant="h5" component="h5" {...props}>
      {props.children}
    </Typography>
  );
};

const H6 = (props: CustomTypographyProps) => {
  return (
    <Typography variant="h6" component="h6" {...props}>
      {props.children}
    </Typography>
  );
};

const P = (props: PProps) => {
  return (
    <Typography variant={sizes[props.size]} component="p" {...props}>
      {props.children}
    </Typography>
  );
};

export { H4, P, H6, H5 };
