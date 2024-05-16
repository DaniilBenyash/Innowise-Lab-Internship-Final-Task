import React from "react";
import { FormSubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormInputName } from "shared/components/FormInputName/FormInputName";
import { FormModal } from "shared/components/FormModal";
import { Skill } from "modules/skills/hooks";

type ManageModalSkillProps<VALUE> = {
  isOpen: boolean;
  handleClose: () => void;
  initialValues?: VALUE;
  handleSubmit: FormSubmitHandler<VALUE>;
  buttonTitle: string;
  title: string;
  skill?: Skill;
};

const ManageModalSkill = <VALUE,>({
  isOpen,
  handleClose,
  initialValues,
  handleSubmit,
  title,
  buttonTitle,
}: ManageModalSkillProps<VALUE>) => {
  const { t } = useTranslation();

  return (
    <FormModal
      title={title}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      confirmButtonTitle={buttonTitle}
      handleClose={handleClose}
      initialValues={initialValues}
    >
      <FormInputName name="name" label={t("formModal.name")} fullWidth />
    </FormModal>
  );
};

export { ManageModalSkill };
