import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { LANGUAGES_QUERY } from "./useGetLanguages";
import { InitialValues } from "modules/languages/types";

const UPDATE_LANGUAGE_MUTATION = gql`
  mutation updateLanguage($id: ID!, $language: LanguageInput!) {
    updateLanguage(id: $id, language: $language) {
      id
      iso2
      name
      native_name
    }
  }
`;

const useUpdateLanguage = () => {
  const [sendRequest, { loading }] = useMutation(UPDATE_LANGUAGE_MUTATION, {
    refetchQueries: [
      {
        query: LANGUAGES_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleRequestUpdateLanguage = (id: string, language: InitialValues) => {
    sendRequest({
      variables: {
        id,
        language: {
          name: language.name,
          iso2: language.iso2,
          native_name: language.nativeName,
        },
      },
    });
  };

  return { handleRequestUpdateLanguage, loading };
};

export { useUpdateLanguage };
