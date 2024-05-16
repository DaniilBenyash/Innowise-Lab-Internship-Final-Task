import { gql } from "@apollo/client";
import { useGetAPI } from "shared/hooks/apollo/useGetAPI";
import { ProjectCV } from "modules/common/types";

type User = {
  id: string;
  email: string;
};

export type ReceivedCVs =
  | {
      id: string;
      name: string;
      description: string;
      user: User;
      projects: ProjectCV;
    }[]
  | null;

export const ALL_CVS_QUERY = gql`
  query Cvs {
    cvs {
      id
      name
      description
      user {
        id
        email
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

export const useGetCVs = () => {
  const { loading, data } = useGetAPI(ALL_CVS_QUERY);
  if (!loading && data.cvs) {
    const cvs: ReceivedCVs = [...data.cvs];
    return { cvs, loading };
  }

  return { loading, cvs: [] };
};
