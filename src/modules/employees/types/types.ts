import { Department, Position, Role } from "modules/common/types";
import { Languages, Skills } from "modules/employees/hooks";

export type RequestedUser = {
  email: string;
  password: string;
  name: string;
  surname: string;
  department: string;
  position: string;
  skills: Skills[];
  languages: Languages[];
  role: Role;
  cvsId: string[] | string;
};

export type InitialValue = Omit<
  RequestedUser,
  "languages" | "skills" | "cvsId"
>;

export type UpdateUser = Omit<RequestedUser, "email" | "password">;

export type EmployeesTableData = {
  id: string;
  email: string;
  department: Department;
  position: Position;
  departmentName: string;
  positionName: string;
  role: Role;
  firstName: string;
  lastName: string;
  profile: {
    fullName: string;
    avatar: string;
    languages: Languages[];
    skills: Skills[];
  };
  cvsId: string[];
};
