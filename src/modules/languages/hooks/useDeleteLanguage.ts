import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { LANGUAGES_QUERY } from "./useGetLanguages";

const DELETE_LANGUAGE_MUTATION = gql`
  mutation deleteLanguage($id: ID!) {
    deleteLanguage(id: $id) {
      affected
    }
  }
`;

const useDeleteLanguage = () => {
  const [sendRequest, { loading }] = useMutation(DELETE_LANGUAGE_MUTATION, {
    refetchQueries: [
      {
        query: LANGUAGES_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleRequestDeleteLanguage = (id: string) => {
    sendRequest({
      variables: {
        id,
      },
    });
  };

  return { handleRequestDeleteLanguage, loading };
};

export { useDeleteLanguage };
