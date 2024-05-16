import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { CV } from "../types";
import { USER_QUERY } from "modules/employees/hooks";
import { CV_QUERY } from "modules/cvs/hooks/useGetCV";
import { ALL_CVS_QUERY } from "modules/cvs/hooks/useGetCVs";

const UPDATE_CV_MUTATION = gql`
  mutation UpdateCV($id: ID!, $cv: CvInput!) {
    updateCv(id: $id, cv: $cv) {
      id
      name
      description
      skills {
        skillName: skill_name
        mastery
      }
      languages {
        languageName: language_name
        proficiency
      }
      user {
        id
        profile {
          fullName: full_name
          skills {
            skillName: skill_name
          }
          languages {
            languageName: language_name
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
    }
  }
`;

export const useUpdateCV = () => {
  const [sendRequest, { loading }] = useMutation(UPDATE_CV_MUTATION, {
    refetchQueries: [USER_QUERY, ALL_CVS_QUERY, CV_QUERY],
    awaitRefetchQueries: true,
  });

  const handleUpdateCV = (userId: string, cv: CV) => {
    sendRequest({
      variables: {
        id: cv.id,
        cv: {
          name: cv.name,
          description: cv.description,
          userId: userId,
          projectsIds: cv.projectsIds ? cv.projectsIds : [],
          languages: cv.languages.map(language => {
            return {
              language_name: language.languageName,
              proficiency: language.proficiency,
            };
          }),
          skills: cv.skills.map(skill => {
            return {
              skill_name: skill.skillName,
              mastery: skill.mastery,
            };
          }),
          is_template: cv.isTemplate === "Yes" ? true : false,
        },
      },
    });
  };

  return { handleUpdateCV, loading };
};
