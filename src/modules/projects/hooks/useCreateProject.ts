import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { PROJECTS_QUERY } from "./useGetProjects";
import { RequestedProject } from "./types";

const CREATE_PROJECT_MUTATION = gql`
  mutation createProject($project: ProjectInput!) {
    createProject(project: $project) {
      id
      name
      internalName: internal_name
      description
      domain
      startDate: start_date
      endDate: end_date
      teamSize: team_size
    }
  }
`;

const useCreateProject = () => {
  const [sendRequest, { loading }] = useMutation(CREATE_PROJECT_MUTATION, {
    refetchQueries: [
      {
        query: PROJECTS_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleCreateProject = (project: RequestedProject) => {
    sendRequest({
      variables: {
        project: {
          name: project.name,
          internal_name: project.internalName,
          description: project.description,
          domain: project.domain,
          start_date: project.startDate,
          end_date: project.endDate,
          team_size: parseInt(project.teamSize),
          skillsIds: [],
        },
      },
    });
  };

  return { handleCreateProject, loading };
};

export { useCreateProject };
