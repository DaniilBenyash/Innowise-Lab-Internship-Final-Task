import { useGetUser } from "modules/employees/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { FlexLayout } from "shared/components/FlexLayout";
import { Loader } from "shared/components/Loader";
import { Page } from "shared/components/Page";
import { H5, P } from "shared/components/Typography";

const EmployeesLanguagesPage = () => {
  const { id } = useParams();
  const { user, loading } = useGetUser(id);
  const { t } = useTranslation();

  if (loading) {
    return (
      <Page isCentered>
        <Loader />
      </Page>
    );
  }
  return (
    <Page isCenteredX>
      <FlexLayout>
        <H5 fontWeight="bold">{user.profile.fullName}</H5>
        <P size="large">{user.email}</P>
        <P size="large">{`${t("user.member")} ${user.createdAt}`}</P>
        <P size="large" fontWeight="bold">
          {t("navigation.languages")}
        </P>
        {user.profile.languages.length ? (
          user.profile.languages.map(language => (
            <FlexLayout
              key={language.languageName}
              direction="row"
              spacing="chips"
            >
              <P size="large">{language.languageName}</P>
              <P size="large">{language.proficiency}</P>
            </FlexLayout>
          ))
        ) : (
          <P size="large">{t("user.languagesNotProvide")}</P>
        )}
      </FlexLayout>
    </Page>
  );
};

export { EmployeesLanguagesPage };
