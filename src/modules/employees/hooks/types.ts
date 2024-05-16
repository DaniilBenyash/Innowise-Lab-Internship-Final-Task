import {
  LanguageProficiency,
  SkillMastery,
  Role,
  Department,
  Position,
} from "modules/common/types";
import { CV } from "modules/common/types/types";

export type User = {
  id: string;
  createdAt: string;
  profile: Profile;
  email: string;
  department: Department;
  position: Position;
  departmentName: string;
  positionName: string;
  role: Role;
  cvs: CV[];
};

export type Profile = {
  fullName: string;
  avatar: string;
  firstName: string;
  lastName: string;
  skills: Skills[];
  languages: Languages[];
};

export type Skills = {
  skillName: string;
  mastery: SkillMastery;
};

export type Languages = {
  languageName: string;
  proficiency: LanguageProficiency;
};
