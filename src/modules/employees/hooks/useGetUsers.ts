import { gql } from "@apollo/client";
import { useGetAPI } from "shared/hooks/apollo";
import { User } from "./types";

export const USERS_QUERY = gql`
  query AllUsers {
    users {
      id
      createdAt: created_at
      profile {
        fullName: full_name
        avatar
        firstName: first_name
        lastName: last_name
        skills {
          skillName: skill_name
          mastery
        }
        languages {
          languageName: language_name
          proficiency
        }
      }
      email
      department {
        id
        name
      }
      position {
        id
        name
      }
      departmentName: department_name
      positionName: position_name
      role
      cvs {
        id
      }
    }
  }
`;

const useGetUsers = () => {
  const { loading, data } = useGetAPI(USERS_QUERY);
  if (data.users) {
    const users: User[] = [...data.users];
    return { loading, users };
  }

  return { loading, users: [] };
};

export { useGetUsers };
