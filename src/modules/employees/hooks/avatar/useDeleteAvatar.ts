import { gql, useMutation } from "@apollo/client";
import { USERS_QUERY, USER_QUERY } from "modules/employees/hooks";

const DELETE_AVATAR_MUTATION = gql`
  mutation deleteAvatar($id: ID!) {
    deleteAvatar(id: $id)
  }
`;

const useDeleteAvatar = () => {
  const [sendRequest, { loading }] = useMutation(DELETE_AVATAR_MUTATION, {
    refetchQueries: [USERS_QUERY, USER_QUERY],
  });

  const handleDeleteAvatar = (id: string) => {
    sendRequest({
      variables: { id },
    });
  };

  return { handleDeleteAvatar, loading };
};

export { useDeleteAvatar };
