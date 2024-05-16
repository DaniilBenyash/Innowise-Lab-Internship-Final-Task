import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { ALL_CVS_QUERY } from "./useGetCVs";
import { CV } from "modules/common/types/types";

const CREATE_CV_MUTATION = gql`
  mutation CreateCv($cv: CvInput!) {
    createCv(cv: $cv) {
      id
    }
  }
`;

export const useCreateCV = () => {
  const [sendRequest, { loading }] = useMutation(CREATE_CV_MUTATION, {
    refetchQueries: [
      {
        query: ALL_CVS_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleCreateCV = (userId: string, cv: CV) => {
    sendRequest({
      variables: {
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

  return { handleCreateCV, loading };
};
