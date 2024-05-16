import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { LANGUAGES_QUERY } from "./useGetLanguages";
import { Language } from "./types";

const CREATE_LANGUAGE_MUTATION = gql`
  mutation createLanguage($language: LanguageInput!) {
    createLanguage(language: $language) {
      id
      iso2
      name
      native_name
    }
  }
`;

const useCreateLanguage = () => {
  const [sendRequest, { loading }] = useMutation(CREATE_LANGUAGE_MUTATION, {
    refetchQueries: [
      {
        query: LANGUAGES_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleRequestCreateLanguage = (language: Language) => {
    sendRequest({
      variables: {
        language: {
          name: language.name,
          iso2: language.iso2,
          native_name: language.nativeName,
        },
      },
    });
  };

  return { handleRequestCreateLanguage, loading };
};

export { useCreateLanguage };
