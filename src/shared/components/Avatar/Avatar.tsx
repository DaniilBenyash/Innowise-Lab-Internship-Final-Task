import React, { useMemo } from "react";
import { Avatar as AvatarMUI } from "@mui/material";

type Size = "small" | "large" | "medium";
type Color = "default" | "secondary";

type AvatarProps = {
  src?: string;
  alt?: string;
  name: string;
  size: Size;
  color?: Color;
};

const getAvatarNickname = (name: string) => {
  if (!name) {
    return "U";
  }
  const fullName = name.toUpperCase().split(" ");
  const [firstName, lastName] = fullName;
  if (!lastName) return firstName[0];

  return `${firstName[0]}${lastName[0]}`;
};

const sizes: Record<Size, number> = {
  small: 40,
  medium: 50,
  large: 120,
};

export const Avatar = ({
  src,
  alt,
  size,
  name = "U",
  color = "default",
}: AvatarProps) => {
  const styles = useMemo(
    () => ({
      width: sizes[size] + "px",
      height: sizes[size] + "px",
      fontSize: sizes[size] / 2,
      backgroundColor: color === "secondary" ? "#C63031" : undefined,
    }),
    [size],
  );

  return (
    <AvatarMUI style={styles} alt={alt} src={src}>
      {getAvatarNickname(name)}
    </AvatarMUI>
  );
};
