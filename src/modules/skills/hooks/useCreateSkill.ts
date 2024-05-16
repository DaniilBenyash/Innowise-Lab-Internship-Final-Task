import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { SKILLS_QUERY } from "./useGetSkills";

const CREATE_SKILL_MUTATION = gql`
  mutation createSkill($skill: SkillInput!) {
    createSkill(skill: $skill) {
      id
      name
    }
  }
`;

const useCreateSkill = () => {
  const [sendRequest, { loading }] = useMutation(CREATE_SKILL_MUTATION, {
    refetchQueries: [
      {
        query: SKILLS_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleRequestCreateSkill = (name: string) => {
    sendRequest({
      variables: {
        skill: {
          name,
        },
      },
    });
  };

  return { handleRequestCreateSkill, loading };
};

export { useCreateSkill };
