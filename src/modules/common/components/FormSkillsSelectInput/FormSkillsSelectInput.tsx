import { useGetSkills } from "modules/skills/hooks";
import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import {
  FormSelectInput,
  FormSelectInputProps,
} from "shared/components/FormSelectInput";
import { Loader } from "shared/components/Loader";

type FormSkillsSelectInputProps = Omit<
  FormSelectInputProps,
  "title" | "values"
>;

const FormSkillsSelectInput = (props: FormSkillsSelectInputProps) => {
  const { loading, skills } = useGetSkills();
  const { t } = useTranslation();

  const resultSkills = useMemo(
    () =>
      skills.map(skill => {
        return {
          value: skill.name,
          label: skill.name,
        };
      }),
    [skills],
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <FormSelectInput
      title={t("navigation.skills")}
      values={resultSkills}
      {...props}
    />
  );
};

export { FormSkillsSelectInput };
