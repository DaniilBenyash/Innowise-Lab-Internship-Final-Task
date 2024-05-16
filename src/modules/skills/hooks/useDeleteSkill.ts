import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { SKILLS_QUERY } from "./useGetSkills";

const DELETE_SKILL_MUTATION = gql`
  mutation deleteSkill($id: ID!) {
    deleteSkill(id: $id) {
      affected
    }
  }
`;

const useDeleteSkill = () => {
  const [sendRequest, { loading }] = useMutation(DELETE_SKILL_MUTATION, {
    refetchQueries: [
      {
        query: SKILLS_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleRequestDeleteSkill = (id: string) => {
    sendRequest({
      variables: {
        id,
      },
    });
  };

  return { handleRequestDeleteSkill, loading };
};

export { useDeleteSkill };
