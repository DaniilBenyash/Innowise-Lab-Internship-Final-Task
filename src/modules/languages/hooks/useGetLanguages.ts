import { gql } from "@apollo/client";
import { Language } from "./types";
import { useGetAPI } from "shared/hooks/apollo";

export const LANGUAGES_QUERY = gql`
  query getLanguages {
    languages {
      id
      iso2
      name
      nativeName: native_name
    }
  }
`;

const useGetLanguages = () => {
  const { loading, data } = useGetAPI(LANGUAGES_QUERY);
  if (data.languages) {
    const languages: Language[] = [...data.languages];
    return { loading, languages: languages };
  }
  return { loading, languages: [] };
};

export { useGetLanguages };
