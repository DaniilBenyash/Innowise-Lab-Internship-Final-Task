import { t } from "i18next";

const getIsUsingTemplatesQuestion = () => [
  { value: "Yes", label: t("common.used") },
  { value: "No", label: t("common.notUsed") },
];

const getLanguagesProficiency = () => [
  {
    value: "a1",
    label: "A1",
  },
  {
    value: "a2",
    label: "A2",
  },
  {
    value: "b1",
    label: "B1",
  },
  {
    value: "b2",
    label: "B2",
  },
  {
    value: "c1",
    label: "C1",
  },
  {
    value: "c2",
    label: "C2",
  },
  {
    value: "native",
    label: t("language.native"),
  },
];

const getSkillsMastery = () => [
  {
    value: "novice",
    label: t("skills.novice"),
  },
  {
    value: "advanced",
    label: t("skills.advanced"),
  },
  {
    value: "competent",
    label: t("skills.competent"),
  },
  {
    value: "proficient",
    label: t("skills.proficient"),
  },
  {
    value: "expert",
    label: t("skills.expert"),
  },
];

export {
  getLanguagesProficiency,
  getSkillsMastery,
  getIsUsingTemplatesQuestion,
};
