type SkillMastery =
  | "novice"
  | "advanced"
  | "competent"
  | "proficient"
  | "expert";

type Role = "Admin" | "Employee";

type LanguageProficiency = "a1" | "a2" | "b1" | "b2" | "c1" | "c2" | "native";

type Department = {
  id: string;
  name: string;
};

type Position = {
  name: string;
  id: string;
};

type CV = {
  id?: string;
  name: string;
  description: string;
  languages: LanguagesCV[];
  skills: SkillCV[];
  projectsIds: string[];
  isTemplate: boolean | string;
};

type LanguagesCV = {
  languageName: string;
  proficiency: LanguageProficiency;
};

type SkillCV = {
  skillName: string;
  mastery: SkillMastery;
};

type ProjectCV = {
  id: string;
  name: string;
  internalName: string;
  domain: string;
  startDate: string;
  endDate: string;
  userId: string;
};

export {
  SkillMastery,
  LanguageProficiency,
  Role,
  Department,
  Position,
  CV,
  ProjectCV,
  LanguagesCV,
  SkillCV,
};
