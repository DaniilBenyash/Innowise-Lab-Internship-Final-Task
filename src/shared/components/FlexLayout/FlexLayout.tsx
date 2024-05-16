import React, { useMemo } from "react";

type Spacings =
  | "empty"
  | "formFields"
  | "chips"
  | "sections"
  | "buttons"
  | "uploadingImage";
type Direction = "column" | "row";
type AlignItems = "center" | "flex-start" | "flex-end" | "stretch" | "inherit";
type JustifyContent = "center" | "flex-start" | "flex-end" | "space-between";

interface Props {
  fullWidth?: boolean;
  children: React.ReactNode;
  direction?: Direction;
  spacing?: Spacings;
  alginItems?: AlignItems;
  justifyContent?: JustifyContent;
}

const spacingsMap: Record<Spacings, number> = {
  empty: 0,
  buttons: 5,
  chips: 15,
  formFields: 20,
  sections: 30,
  uploadingImage: 120,
};

const FlexLayoutComponent = ({
  children,
  direction = "column",
  spacing = "empty",
  alginItems = "center",
  justifyContent = "center",
  fullWidth = false,
}: Props) => {
  const styles = useMemo(
    () => ({
      display: "flex",
      flex: fullWidth ? "100%" : undefined,
      alignItems: alginItems,
      justifyContent: justifyContent,
      flexDirection: direction,
      gap: spacingsMap[spacing],
    }),
    [direction, spacing],
  );

  return <div style={styles}>{children}</div>;
};

export const FlexLayout = React.memo(FlexLayoutComponent);
