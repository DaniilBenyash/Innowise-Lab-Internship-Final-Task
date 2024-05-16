import { gql, useMutation } from "@apollo/client";
import { PROJECTS_QUERY } from "./useGetProjects";

const DELETE_PROJECT_MUTATION = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      affected
    }
  }
`;

const useDeleteProject = () => {
  const [sendRequest, { loading }] = useMutation(DELETE_PROJECT_MUTATION, {
    refetchQueries: [
      {
        query: PROJECTS_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleProjectDelete = (id: string) => {
    sendRequest({
      variables: {
        id,
      },
    });
  };

  return { handleProjectDelete, loading };
};

export { useDeleteProject };
