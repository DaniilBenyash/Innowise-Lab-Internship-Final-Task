import { Department } from "modules/common/types/types";

export type RequestedDepartment = Omit<Department, "id">;
