import { gql } from "@apollo/client";
import { SkillCV, LanguagesCV, ProjectCV } from "modules/common/types";
import { useGetAPI } from "shared/hooks/apollo";

export type RecivedCV = {
  id: string;
  name: string;
  description: string;
  user: {
    id: string;
    profile: {
      fullName: string;
      skills: SkillCV[];
      languages: LanguagesCV[];
    };
    position: { name: string };
  };
  skills: SkillCV[];
  languages: LanguagesCV[];
  projects: ProjectCV[];
};

export const CV_QUERY = gql`
  query Cv($id: ID!) {
    cv(id: $id) {
      id
      name
      description
      user {
        id
        profile {
          fullName: full_name
          skills {
            skillName: skill_name
            mastery
          }
          languages {
            languageName: language_name
            proficiency
          }
        }
        position {
          name
        }
      }
      projects {
        id
        name
        internalName: internal_name
        domain
        startDate: start_date
        endDate: end_date
      }
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
`;

export const useGetCV = (id: string) => {
  const { loading, data } = useGetAPI(CV_QUERY, { id });

  if (data.cv) {
    const cv: RecivedCV = data.cv;
    return { loading, cv };
  }

  return { loading, cv: null };
};
