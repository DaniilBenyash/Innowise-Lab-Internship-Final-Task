import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { ALL_CVS_QUERY } from "./useGetCVs";

const DELETE_CV_MUTATION = gql`
  mutation DeleteCv($id: ID!) {
    deleteCv(id: $id) {
      affected
    }
  }
`;

export const useDeleteCV = () => {
  const [sendRequest, { loading }] = useMutation(DELETE_CV_MUTATION, {
    refetchQueries: [
      {
        query: ALL_CVS_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleDeleteCV = (id: string) => {
    sendRequest({
      variables: { id },
    });
  };

  return { handleDeleteCV, loading };
};
