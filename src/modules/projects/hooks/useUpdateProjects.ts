import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { PROJECTS_QUERY } from "./useGetProjects";
import { RequestedProject } from "./types";
import { PROJECT_QUERY } from "./useGetProject";

const UPDATE_PROJECT_MUTATION = gql`
  mutation updateProject($id: ID!, $project: ProjectInput!) {
    updateProject(id: $id, project: $project) {
      id
      name
      internal_name
      description
      domain
      start_date
      end_date
      team_size
    }
  }
`;

const useUpdateProject = () => {
  const [sendRequest, { loading }] = useMutation(UPDATE_PROJECT_MUTATION, {
    refetchQueries: [PROJECTS_QUERY, PROJECT_QUERY],
    awaitRefetchQueries: true,
  });

  const handleUpdateProject = (id: string, project: RequestedProject) => {
    sendRequest({
      variables: {
        id,
        project: {
          name: project.name,
          domain: project.domain,
          description: project.description,
          internal_name: project.internalName,
          start_date: project.startDate,
          end_date: project.endDate,
          team_size: parseInt(project.teamSize ? project.teamSize : "1"),
          skillsIds: [],
        },
      },
    });
  };

  return { handleUpdateProject, loading };
};

export { useUpdateProject };
