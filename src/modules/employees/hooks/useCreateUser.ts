import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { USERS_QUERY } from "./useGetUsers";
import { RequestedUser } from "../types";

const CREATE_USER_MUTATION = gql`
  mutation createUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      created_at
      email
      profile {
        first_name
        last_name
        full_name
        avatar
        skills {
          skill_name
          mastery
        }
        languages {
          language_name
          proficiency
        }
      }
      role
    }
  }
`;

const useCreateUser = () => {
  const [sendRequest, { loading }] = useMutation(CREATE_USER_MUTATION, {
    refetchQueries: [
      {
        query: USERS_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleRequestCreateUser = (user: RequestedUser) => {
    sendRequest({
      variables: {
        user: {
          auth: {
            email: user.email,
            password: user.password,
          },
          profile: {
            first_name: user.name,
            last_name: user.surname,
            skills: [],
            languages: [],
          },
          cvsIds: "0",
          departmentId: user.department,
          positionId: user.position,
          role: user.role,
        },
      },
    });
  };

  return { handleRequestCreateUser, loading };
};

export { useCreateUser };
