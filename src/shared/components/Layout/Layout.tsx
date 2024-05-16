import { useGetUser } from "modules/employees/hooks";
import React from "react";
import { Outlet, useLocation, useParams } from "react-router";
import { Breadcrumbs } from "shared/components/Breadcrumbs";

const Layout = () => {
  const location = useLocation();
  const { id } = useParams();

  const isProfile = location.pathname.includes("profile");
  const { loading, user } = isProfile && useGetUser(id);

  if (user && !loading) {
    return (
      <>
        <Breadcrumbs
          location={location.pathname}
          hrefHomePage="employees"
          fullName={user?.profile?.fullName}
        />
        <Outlet />
      </>
    );
  }

  return (
    <>
      <Breadcrumbs
        fullName={id}
        location={location.pathname}
        hrefHomePage="employees"
      />
      <Outlet />
    </>
  );
};

export { Layout };
