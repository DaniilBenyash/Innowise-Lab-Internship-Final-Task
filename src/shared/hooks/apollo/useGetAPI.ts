import { DocumentNode, useQuery } from "@apollo/client";
import toast from "react-hot-toast";

const useGetAPI = (scheme: DocumentNode, variables?: unknown) => {
  const { loading, error, data } = useQuery(scheme, {
    variables: variables,
  });

  if (error) {
    toast.error(error.message);
    return { loading, data: [] };
  }

  if (!loading && data) {
    return { loading, data };
  }

  return { loading, data: [] };
};

export { useGetAPI };
