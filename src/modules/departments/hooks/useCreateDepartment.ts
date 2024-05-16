import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { ALL_DEPARTMENTS_QUERY } from "modules/common/hooks";

const CREATE_DEPARTMENT_MUTATION = gql`
  mutation createDepartment($department: DepartmentInput!) {
    createDepartment(department: $department) {
      id
      name
    }
  }
`;

export const useCreateDepartment = () => {
  const [sendRequest, { loading }] = useMutation(CREATE_DEPARTMENT_MUTATION, {
    refetchQueries: [
      {
        query: ALL_DEPARTMENTS_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleCreateDepartment = (name: string) => {
    sendRequest({
      variables: {
        department: {
          name,
        },
      },
    });
  };

  return { handleCreateDepartment, loading };
};
