import { useLazyQuery, gql } from "@apollo/client";
import { authService } from "modules/auth/services/authService";
import { Authentication } from "./types";

const LOGIN_USER_QUERY = gql`
  query loginUser($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        id
        email
      }
      access_token
    }
  }
`;

export const useLogin = () => {
  const [sendRequest, { loading }] = useLazyQuery(LOGIN_USER_QUERY);

  const handleUserRegister = (auth: Authentication) => {
    sendRequest({
      variables: { auth },
      onCompleted: data => {
        const token = data.login.access_token;
        authService.setAccessToken(token);
      },
    });
  };

  return {
    handleUserRegister,
    loading,
    isAuth: Boolean(authService.getAccessToken()),
  };
};
