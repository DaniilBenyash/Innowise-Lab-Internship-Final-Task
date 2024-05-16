import React from "react";
import { Outlet, generatePath, useParams } from "react-router-dom";
import { ButtonNavigation } from "shared/components/ButtonNavigation";
import {
  EMPLOYEES_PROFILE_PAGE,
  EMPLOYEES_SKILLS_PAGE,
  EMPLOYEES_LANGUAGES_PAGE,
  EMPLOYEES_CVS_PAGE,
} from "app/routing";
import { FlexLayout } from "shared/components/FlexLayout";
import { P } from "../Typography";
import { useTranslation } from "react-i18next";
import { Box } from "../Box";

const LayoutProfile = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  return (
    <>
      <Box paddingTop={120}>
        <FlexLayout direction="row" justifyContent="flex-start">
          <ButtonNavigation to={generatePath(EMPLOYEES_PROFILE_PAGE, { id })}>
            <P size="small" fontWeight="bold">
              {t("user.profile")}
            </P>
          </ButtonNavigation>
          <ButtonNavigation to={generatePath(EMPLOYEES_SKILLS_PAGE, { id })}>
            <P size="small" fontWeight="bold">
              {t("navigation.skills")}
            </P>
          </ButtonNavigation>
          <ButtonNavigation to={generatePath(EMPLOYEES_LANGUAGES_PAGE, { id })}>
            <P size="small" fontWeight="bold">
              {t("navigation.languages")}
            </P>
          </ButtonNavigation>
          <ButtonNavigation to={generatePath(EMPLOYEES_CVS_PAGE, { id })}>
            <P size="small" fontWeight="bold">
              {t("common.cvs")}
            </P>
          </ButtonNavigation>
        </FlexLayout>
      </Box>

      <Outlet />
    </>
  );
};

export { LayoutProfile };
