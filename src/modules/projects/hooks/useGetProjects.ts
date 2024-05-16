import gql from "graphql-tag";
import { useGetAPI } from "shared/hooks/apollo/useGetAPI";
import { Project } from "./types";

export const PROJECTS_QUERY = gql`
  query getProjects {
    projects {
      id
      name
      internalName: internal_name
      domain
      startDate: start_date
      endDate: end_date
      teamSize: team_size
      description
    }
  }
`;

const useGetProjects = () => {
  const { data, loading } = useGetAPI(PROJECTS_QUERY);
  if (data.projects) {
    return { projects: data.projects as Project[], loading };
  }

  return { projects: [], loading };
};

export { useGetProjects };
