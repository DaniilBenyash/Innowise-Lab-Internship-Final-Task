import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { ALL_DEPARTMENTS_QUERY } from "modules/common/hooks";

const UPDATE_DEPARTMENTS_MUTATION = gql`
  mutation UpdateDepartment($id: ID!, $department: DepartmentInput!) {
    updateDepartment(id: $id, department: $department) {
      id
      name
    }
  }
`;

const useUpdateDepartments = () => {
  const [sendRequest, { loading }] = useMutation(UPDATE_DEPARTMENTS_MUTATION, {
    refetchQueries: [
      {
        query: ALL_DEPARTMENTS_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleUpdateDepartment = (id: string, name: string) => {
    sendRequest({
      variables: {
        id,
        department: {
          name,
        },
      },
    });
  };

  return { handleUpdateDepartment, loading };
};

export { useUpdateDepartments };
