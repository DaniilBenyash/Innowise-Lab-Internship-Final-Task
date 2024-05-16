import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { USERS_QUERY } from "./useGetUsers";

const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      affected
    }
  }
`;

const useDeleteUser = () => {
  const [sendRequest, { loading }] = useMutation(DELETE_USER_MUTATION, {
    refetchQueries: [
      {
        query: USERS_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleRequestDeleteUser = (id: string) => {
    sendRequest({
      variables: {
        id,
      },
    });
  };

  return { handleRequestDeleteUser, loading };
};

export { useDeleteUser };
