import React from "react";
import { Navigate } from "react-router";
import { LOGIN_PAGE, EMPLOYEES_PAGE  } from "app/routing";
import { useAuth } from "modules/common/utils";

type ProtectedRouteProps = {
  children: JSX.Element;
  isAuthPage?: boolean;
};

export const ProtectedRoute = ({
  children,
  isAuthPage = false,
}: ProtectedRouteProps) => {
  const { isAuth } = useAuth();

  if (isAuthPage) return isAuth ? <Navigate to={EMPLOYEES_PAGE} /> : children;

  return isAuth ? children : <Navigate to={LOGIN_PAGE} />;
};
