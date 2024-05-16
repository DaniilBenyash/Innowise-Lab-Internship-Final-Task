import React from "react";
import { FlexLayout } from "shared/components/FlexLayout";
import { P } from "shared/components/Typography";

type ListCVDetailsProps = {
  list: string[];
};
export const ListCVDetails = ({ list }: ListCVDetailsProps) => {
  return (
    <FlexLayout
      direction="row"
      spacing="formFields"
      justifyContent="flex-start"
    >
      {list.map(value => (
        <P size="large" key={value}>
          {value}
        </P>
      ))}
    </FlexLayout>
  );
};
