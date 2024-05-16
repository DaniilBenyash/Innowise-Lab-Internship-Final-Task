import { useMutation } from "@apollo/client";
import { SKILLS_QUERY } from "./useGetSkills";
import gql from "graphql-tag";

const UPDATE_SKILL_MUTATION = gql`
  mutation updateSkill($id: ID!, $skill: SkillInput!) {
    updateSkill(id: $id, skill: $skill) {
      id
      name
    }
  }
`;

const useUpdateSkill = () => {
  const [sendRequest, { loading }] = useMutation(UPDATE_SKILL_MUTATION, {
    refetchQueries: [
      {
        query: SKILLS_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleRequestUpdateSkill = (id: string, name: string) => {
    sendRequest({
      variables: {
        id,
        skill: {
          name,
        },
      },
    });
  };

  return { handleRequestUpdateSkill, loading };
};

export { useUpdateSkill };
