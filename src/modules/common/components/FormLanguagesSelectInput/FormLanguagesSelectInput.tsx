import { useGetLanguages } from "modules/languages/hooks";
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

const FormLanguagesSelectInput = (props: FormPositionSelectInputProps) => {
  const { loading, languages } = useGetLanguages();
  const { t } = useTranslation();

  const resultLanguages = useMemo(
    () =>
      languages.map(language => {
        return {
          value: language.name,
          label: language.name,
        };
      }),
    [languages],
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <FormSelectInput
      title={t("CVDetailsPage.languages")}
      values={resultLanguages}
      {...props}
    />
  );
};

export { FormLanguagesSelectInput };
