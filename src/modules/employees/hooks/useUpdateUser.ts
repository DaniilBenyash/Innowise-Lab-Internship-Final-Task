import { gql, useMutation } from "@apollo/client";
import { USERS_QUERY, USER_QUERY } from "modules/employees/hooks";
import { UpdateUser } from "modules/employees/types";

const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $user: UpdateUserInput!) {
    updatedUser: updateUser(id: $id, user: $user) {
      id
      email
      profile {
        first_name
        last_name
        full_name
      }
    }
  }
`;

const useUpdateUser = () => {
  const [sendRequest, { loading }] = useMutation(UPDATE_USER, {
    refetchQueries: [USERS_QUERY, USER_QUERY],
    awaitRefetchQueries: true,
  });

  const handleRequestUpdateUser = (id: string, user: UpdateUser) => {
    sendRequest({
      variables: {
        id,
        user: {
          profile: {
            first_name: user.name,
            last_name: user.surname,
            skills: user.skills,
            languages: user.languages,
          },
          cvsIds: user.cvsId,
          departmentId: user.department,
          positionId: user.position,
          role: user.role,
        },
      },
    });
  };
  return { handleRequestUpdateUser, loading };
};

export { useUpdateUser };
