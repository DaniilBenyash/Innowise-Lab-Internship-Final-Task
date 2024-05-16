import { useGetAPI } from "shared/hooks/apollo/useGetAPI";
import { Project } from "./types";
import gql from "graphql-tag";

export const PROJECT_QUERY = gql`
  query getProject($id: ID!) {
    project(id: $id) {
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

const useGetProject = (id: string) => {
  const { loading, data } = useGetAPI(PROJECT_QUERY, { id });
  if (data.project) {
    return { loading, project: data.project as Project };
  }
  return { loading, project: null };
};

export { useGetProject };
