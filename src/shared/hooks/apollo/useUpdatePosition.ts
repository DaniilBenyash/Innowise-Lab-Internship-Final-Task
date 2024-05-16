import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { POSITIONS_QUERY } from "modules/common/hooks/useGetPositions";

const UPDATE_POSITION_MUTATION = gql`
  mutation updatePosition($id: ID!, $position: PositionInput!) {
    updatePosition(id: $id, position: $position) {
      id
      created_at
      name
    }
  }
`;

const useUpdatePosition = () => {
  const [sendRequest, { loading }] = useMutation(UPDATE_POSITION_MUTATION, {
    refetchQueries: [
      {
        query: POSITIONS_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleRequestUpdatePositions = (id: string, name: string) => {
    sendRequest({
      variables: {
        id,
        position: {
          name,
        },
      },
    });
  };

  return { handleRequestUpdatePositions, loading };
};

export { useUpdatePosition };
