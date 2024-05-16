import { setContext } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { authService } from "modules/auth/services/authService";
import toast from "react-hot-toast";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${authService.getAccessToken()}`,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      toast.error(message);

      if (message === "Unauthorized") {
        toast.error("The user is not authorized");
      }
    });
  }
  if (networkError) {
    toast.error("Sorry we have problem with server!");
  }
});

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_API_URL,
});

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
