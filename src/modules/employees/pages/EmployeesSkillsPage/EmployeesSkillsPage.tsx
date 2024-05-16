import { useGetUser } from "modules/employees/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { FlexLayout } from "shared/components/FlexLayout";
import { Loader } from "shared/components/Loader";
import { Page } from "shared/components/Page";
import { H5, P } from "shared/components/Typography";

const EmployeesSkillsPage = () => {
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
          {t("navigation.skills")}
        </P>
        {user.profile.languages.length ? (
          user.profile.skills.map(skill => (
            <FlexLayout key={skill.skillName} direction="row" spacing="chips">
              <P size="large">{skill.skillName}</P>
              <P size="large">{skill.mastery}</P>
            </FlexLayout>
          ))
        ) : (
          <P size="large">{t("user.skillsNotProvide")}</P>
        )}
      </FlexLayout>
    </Page>
  );
};

export { EmployeesSkillsPage };
