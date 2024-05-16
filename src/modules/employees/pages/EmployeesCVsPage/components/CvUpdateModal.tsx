import { FormLanguagesSelectInput } from "modules/common/components/FormLanguagesSelectInput";
import { FormSkillsSelectInput } from "modules/common/components/FormSkillsSelectInput";
import { CV } from "modules/common/types";
import React from "react";
import { FormSubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FlexLayout } from "shared/components/FlexLayout";
import { FormInput } from "shared/components/FormInput";
import { FormModal } from "shared/components/FormModal";
import { FormSelectInput } from "shared/components/FormSelectInput";
import { FormTextArea } from "shared/components/FormTextArea/FormTextArea";
import {
  getLanguagesProficiency,
  getSkillsMastery,
  getIsUsingTemplatesQuestion,
} from "shared/utils";

type CVUpdateModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  initialValues: CV;
  handleSubmit: FormSubmitHandler<CV>;
  title: string;
  buttonTitle: string;
};

const CVUpdateModal = ({
  isOpen,
  handleClose,
  initialValues,
  handleSubmit,
  title,
  buttonTitle,
}: CVUpdateModalProps) => {
  const { t } = useTranslation();

  return (
    <FormModal
      modalSize="medium"
      title={title}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      confirmButtonTitle={buttonTitle}
      handleClose={handleClose}
      initialValues={initialValues}
    >
      <FlexLayout alginItems="inherit" spacing="sections" fullWidth>
        <FlexLayout
          fullWidth
          alginItems="stretch"
          direction="row"
          justifyContent="space-between"
          spacing="formFields"
        >
          <FormInput
            name="name"
            label={t("formModal.name")}
            required
            fullWidth
          />
          <FormSelectInput
            name="isTemplate"
            title={t("CVDetailsPage.template")}
            values={getIsUsingTemplatesQuestion()}
            required
            fullWidth
          />
        </FlexLayout>
        {initialValues.languages.map((language, index) => (
          <FlexLayout
            key={language.languageName}
            alginItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing="formFields"
          >
            <FormLanguagesSelectInput
              required
              name={`languages[${index}.languageName]`}
              fullWidth
            />
            <FormSelectInput
              name={`languages[${index}.proficiency]`}
              fullWidth
              required
              title={t("language.proficiency")}
              values={getLanguagesProficiency()}
            />
          </FlexLayout>
        ))}
        {initialValues.skills.map((skill, index) => (
          <FlexLayout
            key={skill.skillName}
            alginItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing="formFields"
          >
            <FormSkillsSelectInput
              name={`skills[${index}.skillName]`}
              required
              fullWidth
            />
            <FormSelectInput
              name={`skills[${index}.mastery]`}
              required
              fullWidth
              title={t("common.mastery")}
              values={getSkillsMastery()}
            />
          </FlexLayout>
        ))}
        <FormTextArea
          name="description"
          required
          fullWidth
          label={t("cvsPage.description")}
        />
      </FlexLayout>
    </FormModal>
  );
};

export { CVUpdateModal };
