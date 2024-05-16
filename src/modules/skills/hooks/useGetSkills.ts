import { gql } from "@apollo/client";
import { useGetAPI } from "shared/hooks/apollo";

export const SKILLS_QUERY = gql`
  query getSkills {
    skills {
      id
      name
    }
  }
`;

export type Skill = {
  id: string;
  name: string;
};

const useGetSkills = () => {
  const { loading, data } = useGetAPI(SKILLS_QUERY);
  if (data.skills) {
    return { skills: [...data.skills] as Skill[], loading };
  }
  return { skills: [], loading };
};

export { useGetSkills };
