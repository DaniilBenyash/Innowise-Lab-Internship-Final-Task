import React from "react";
import { P } from "shared/components/Typography";

type PCVDetailsProps = {
  children: string;
  marginTop?: number;
};

export const PCVDetails = ({ children, marginTop = 2 }: PCVDetailsProps) => {
  return (
    <P size="small" color="secondary" marginTop={marginTop}>
      {children + ":"}
    </P>
  );
};
