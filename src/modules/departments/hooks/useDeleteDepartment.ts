import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { ALL_DEPARTMENTS_QUERY } from "modules/common/hooks";

const DELETE_DEPARTMENT_MUTATION = gql`
  mutation DeleteDepartment($id: ID!) {
    deleteDepartment(id: $id) {
      affected
    }
  }
`;

export const useDeleteDepartment = () => {
  const [sendRequest, { loading }] = useMutation(DELETE_DEPARTMENT_MUTATION, {
    refetchQueries: [
      {
        query: ALL_DEPARTMENTS_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleDeleteDepartment = (id: string) => {
    sendRequest({
      variables: { id },
    });
  };

  return { handleDeleteDepartment, loading };
};
