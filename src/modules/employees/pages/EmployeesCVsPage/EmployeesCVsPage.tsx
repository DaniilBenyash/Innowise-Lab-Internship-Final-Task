import React from "react";
import { useParams } from "react-router";
import { useGetUser } from "modules/employees/hooks";
import { EmployeesCvsTable } from "./components";
import { Loader } from "shared/components/Loader";
import { Page } from "shared/components/Page";
import { H5 } from "shared/components/Typography";
import { useTranslation } from "react-i18next";
import { useAuth } from "modules/common/utils";

const EmployeesCVsPage = () => {
  const { id } = useParams();
  const { user, loading } = useGetUser(id);
  const { t } = useTranslation();
  const { userId, isAdmin } = useAuth();
  const isOwner = userId === user?.id || isAdmin;

  if (loading) {
    return (
      <Page isCentered>
        <Loader />
      </Page>
    );
  }

  if (!isOwner) {
    return (
      <Page isCenteredX>
        <H5>{t("common.blocked")}</H5>
      </Page>
    );
  }

  if (!user?.cvs.length) {
    return (
      <Page isCenteredX>
        <H5>{t("cvsPage.haven't")}</H5>
      </Page>
    );
  }

  return (
    <Page>
      <EmployeesCvsTable rows={user.cvs} />
    </Page>
  );
};

export { EmployeesCVsPage };
