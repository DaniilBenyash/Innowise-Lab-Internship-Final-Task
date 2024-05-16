import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { POSITIONS_QUERY } from "modules/common/hooks/useGetPositions";

const CREATE_POSITION_MUTATION = gql`
  mutation createPosition($position: PositionInput!) {
    createPosition(position: $position) {
      id
      name
    }
  }
`;

const useCreatePosition = () => {
  const [sendRequest, { loading }] = useMutation(CREATE_POSITION_MUTATION, {
    refetchQueries: [
      {
        query: POSITIONS_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleRequestCreatePositions = (name: string) => {
    sendRequest({
      variables: {
        position: {
          name,
        },
      },
    });
  };

  return { handleRequestCreatePositions, loading };
};

export { useCreatePosition };
