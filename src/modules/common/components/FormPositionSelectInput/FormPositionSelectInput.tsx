import { useGetPositions } from "modules/common/hooks";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  FormSelectInput,
  FormSelectInputProps,
} from "shared/components/FormSelectInput";
import { Loader } from "shared/components/Loader";

type FormPositionSelectInputProps = Omit<
  FormSelectInputProps,
  "title" | "values"
>;

const FormPositionSelectInput = (props: FormPositionSelectInputProps) => {
  const { loading, positions } = useGetPositions();
  const { t } = useTranslation();

  const resultPositions = useMemo(
    () =>
      positions.map(position => {
        return {
          value: position.id,
          label: position.name,
        };
      }),
    [loading],
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <FormSelectInput
      title={t("input.position")}
      values={resultPositions}
      {...props}
    />
  );
};

export { FormPositionSelectInput };
