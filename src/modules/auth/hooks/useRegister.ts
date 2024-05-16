import { useMutation, gql } from "@apollo/client";
import { authService } from "modules/auth/services/authService";
import { Authentication } from "./types";

const REGISTER_USER_MUTATION = gql`
  mutation registerUser($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
        email
      }
      access_token
    }
  }
`;

export const useRegister = () => {
  const [sendRequest, { loading }] = useMutation(REGISTER_USER_MUTATION);

  const handleUserRegister = (auth: Authentication) => {
    sendRequest({
      variables: { auth },
      onCompleted: data => {
        const token = data.signup.access_token;
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
