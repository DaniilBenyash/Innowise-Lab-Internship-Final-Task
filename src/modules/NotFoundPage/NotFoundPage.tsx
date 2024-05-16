import { EMPLOYEES_PAGE } from "app/routing";
import React from "react";
import { Navigate } from "react-router";

export const NotFoundPage = () => {
  return <Navigate to={EMPLOYEES_PAGE} />;
};
