import { Department } from "modules/common/types";

type InitialValue = Omit<Department, "id">;

export { InitialValue };
