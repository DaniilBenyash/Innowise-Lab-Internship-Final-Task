import gql from "graphql-tag";
import { useGetAPI } from "shared/hooks/apollo/useGetAPI";
import { Position } from "../types/types";

export const POSITIONS_QUERY = gql`
  query getPositions {
    positions {
      id
      name
    }
  }
`;

const useGetPositions = () => {
  const { data, loading } = useGetAPI(POSITIONS_QUERY);
  if (data.positions) {
    const positions: Position[] = [...data.positions];
    return { positions, loading };
  }

  return { positions: [], loading };
};

export { useGetPositions };
