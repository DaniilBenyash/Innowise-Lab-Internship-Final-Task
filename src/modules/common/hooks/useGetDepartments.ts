import { gql } from "@apollo/client";
import { useGetAPI } from "shared/hooks/apollo";
import { Department } from "modules/common/types";

export const ALL_DEPARTMENTS_QUERY = gql`
  query Departments {
    departments {
      name
      id
    }
  }
`;

export const useGetDepartments = () => {
  const { loading, data } = useGetAPI(ALL_DEPARTMENTS_QUERY);

  if (data.departments) {
    const departments: Department[] = [...data.departments];
    return { loading, departments: departments };
  }

  return { loading, departments: [] };
};
