import { gql, useMutation } from "@apollo/client";
import { POSITIONS_QUERY } from "modules/common/hooks/useGetPositions";

const DELETE_POSITION_MUTATION = gql`
  mutation deletePosition($id: ID!) {
    deletePosition(id: $id) {
      affected
    }
  }
`;

const useDeletePosition = () => {
  const [sendRequest, { loading }] = useMutation(DELETE_POSITION_MUTATION, {
    refetchQueries: [
      {
        query: POSITIONS_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handlePositionDelete = (id: string) => {
    sendRequest({
      variables: {
        id,
      },
    });
  };

  return { handlePositionDelete, loading };
};

export { useDeletePosition };
