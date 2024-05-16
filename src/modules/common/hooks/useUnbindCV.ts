import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { ALL_CVS_QUERY } from "modules/cvs/hooks/useGetCVs";
import { USER_QUERY } from "modules/employees/hooks";

const UNBIND_CV_MUTATION = gql`
  mutation UnbindCv($id: ID!) {
    unbindCv(id: $id) {
      id
      name
    }
  }
`;

export const useUnbindCV = () => {
  const [sendRequest, { loading }] = useMutation(UNBIND_CV_MUTATION, {
    refetchQueries: [USER_QUERY, ALL_CVS_QUERY],
  });

  const handleUnbindCV = (id: string) => {
    sendRequest({
      variables: { id },
    });
  };

  return { handleUnbindCV, loading };
};
