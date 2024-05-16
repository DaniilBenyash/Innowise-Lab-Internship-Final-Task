import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { FlexLayout } from "shared/components/FlexLayout";

type LoaderProps = {
  color?: "success" | "secondary" | "inherit";
};

const Loader = ({ color = "inherit" }: LoaderProps) => {
  return (
    <FlexLayout>
      <CircularProgress color={color} />
    </FlexLayout>
  );
};

export { Loader };
