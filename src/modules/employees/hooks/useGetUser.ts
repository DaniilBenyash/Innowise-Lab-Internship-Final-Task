import gql from "graphql-tag";
import { useGetAPI } from "shared/hooks/apollo";
import { User } from "./types";

export const USER_QUERY = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      created_at
      profile {
        fullName: full_name
        firstName: first_name
        lastName: last_name
        avatar
        skills {
          skillName: skill_name
          mastery
        }
        languages {
          languageName: language_name
          proficiency
        }
      }
      department {
        id
        name
      }
      position {
        id
        name
      }
      email
      departmentName: department_name
      positionName: position_name
      role
      cvs {
        id
        name
        createdAt: created_at
        isTemplate: is_template
        description
        skills {
          skillName: skill_name
          mastery
        }
        languages {
          languageName: language_name
          proficiency
        }
      }
    }
  }
`;

const useGetUser = (id: string) => {
  if (!id) {
    return { loading: false, user: null };
  }

  const { loading, data } = useGetAPI(USER_QUERY, { id });
  if (data.user) {
    const date = new Date(parseFloat(data.user.created_at));
    const user: User = { ...data.user, createdAt: date.toDateString() };
    return { loading, user };
  }
  return { loading, user: null };
};

export { useGetUser };
