import React, { useState } from "react";
import { FormSubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormModal } from "shared/components/FormModal";
import { FormInput } from "shared/components/FormInput";
import { CV } from "modules/common/types/types";
import { FlexLayout } from "shared/components/FlexLayout";
import { RecivedCV } from "../hooks/useGetCV";
import { FormLanguagesSelectInput } from "modules/common/components/FormLanguagesSelectInput";
import { FormSkillsSelectInput } from "modules/common/components/FormSkillsSelectInput";
import { FormSelectInput } from "shared/components/FormSelectInput";
import { getLanguagesProficiency, getSkillsMastery } from "shared/utils";
import { useAuth } from "modules/common/utils";
import { FormTextArea } from "shared/components/FormTextArea/FormTextArea";
import { Button } from "@mui/material";

type Variants = "update" | "create";

type ManageModalCVProps = {
  isOpen: boolean;
  handleClose: () => void;
  variant: Variants;
  cv?: RecivedCV;
  onCreateCV?: (id: string, cv: CV) => void;
  onUpdateCV?: (id: string, cv: CV) => void;
  initialValue: CV;
};

export const ManageModalCV = ({
  isOpen,
  handleClose,
  variant,
  cv,
  onCreateCV,
  onUpdateCV,
  initialValue,
}: ManageModalCVProps) => {
  const { t } = useTranslation();
  const { userId } = useAuth();

  const [numberLanguages, setNumberLanguages] = useState([]);
  const [numberSkills, setNumberSkills] = useState([]);

  const handleSubmit: FormSubmitHandler<CV> = ({ data }) => {
    if (variant === "create") onCreateCV(userId, data);
    if (variant === "update") onUpdateCV(cv?.user?.id, data);
    handleClose();
  };

  const handleClickSetNumberLanguages = () =>
    setNumberLanguages([...numberLanguages, Math.random()]);
  const handleClickSetNumberSkills = () =>
    setNumberSkills([...numberSkills, Math.random()]);

  const handleDeleteNumberLanguages = (index: number) => {
    setNumberLanguages(numberLanguages.filter((language, id) => id !== index));
  };
  const handleDeleteNumberSkills = (index: number) => {
    setNumberSkills(numberSkills.filter((skill, id) => id !== index));
  };
  return (
    <FormModal
      title={t(`cvsPage.${variant}CV`)}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      confirmButtonTitle={t(`cvsPage.${variant}`)}
      handleClose={handleClose}
      initialValues={initialValue}
      modalSize="medium"
    >
      <FlexLayout
        spacing="formFields"
        fullWidth
        alginItems="inherit"
        key={userId}
      >
        <FormInput fullWidth required name="name" label={t("cvsPage.name")} />
        <FormTextArea
          fullWidth
          required
          name="description"
          label={t("cvsPage.description")}
        />
        {variant === "create" ? (
          <>
            <Button
              color="secondary"
              variant="text"
              onClick={handleClickSetNumberLanguages}>
              {t("cvsPage.addLanguage")}
            </Button>
            {numberLanguages.map((language, index) => {
              return (
                <FlexLayout fullWidth key={language} alginItems="stretch">
                  <FlexLayout
                    fullWidth
                    key={language.languageName}
                    alginItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing="formFields">
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
                  <Button onClick={() => handleDeleteNumberLanguages(index)}>
                    {t("cvsPage.deleteLanguage")}
                  </Button>
                </FlexLayout>
              );
            })}

            <Button
              color="secondary"
              variant="text"
              onClick={handleClickSetNumberSkills}>
              {t("cvsPage.addSkill")}
            </Button>
            {numberSkills.map((skill, index) => (
              <FlexLayout fullWidth key={skill} alginItems="stretch">
                <FlexLayout
                  fullWidth
                  key={skill.skillName}
                  alginItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing="formFields">
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
                <Button onClick={() => handleDeleteNumberSkills(index)}>
                  {t("cvsPage.deleteSkill")}
                </Button>
              </FlexLayout>
            ))}
          </>
        ) : (
          <>
            {cv?.languages?.map((language, index) => {
              return (
                <FlexLayout
                  fullWidth
                  key={language.languageName}
                  alginItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing="formFields">
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
              );
            })}

            {cv?.skills?.map((skill, index) => (
              <FlexLayout
                fullWidth
                key={skill.skillName}
                alginItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing="formFields">
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
          </>
        )}
      </FlexLayout>
    </FormModal>
  );
};
