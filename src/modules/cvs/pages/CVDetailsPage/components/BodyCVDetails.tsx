import React from "react";
import { H4, P, H6 } from "shared/components/Typography";
import { ListCVDetails } from "./ListCVDetails";
import { useTranslation } from "react-i18next";
import { PCVDetails } from "./PCVDetails";
import { RecivedCV } from "modules/cvs/hooks/useGetCV";

type BodyCVDetailsProps = {
  cv: RecivedCV;
};

export const BodyCVDetails = ({ cv }: BodyCVDetailsProps) => {
  const { t } = useTranslation();
  const skillsName = cv?.skills?.map(skill => skill.skillName);
  const languagesName = cv?.languages?.map(language => language.languageName);
  return (
    <>
      <H4 marginTop={2}>{cv?.name}</H4>

      <PCVDetails>{t("CVDetailsPage.description")}</PCVDetails>
      <P size="large">{cv?.description}</P>

      <PCVDetails>{t("CVDetailsPage.employee")}</PCVDetails>
      <H6>{cv?.user?.profile?.fullName}</H6>
      <P size="medium">{cv?.user?.position?.name}</P>

      <PCVDetails>{t("CVDetailsPage.skills")}</PCVDetails>
      {cv?.skills && <ListCVDetails list={skillsName} />}

      <PCVDetails>{t("CVDetailsPage.languages")}</PCVDetails>
      {cv?.languages && <ListCVDetails list={languagesName} />}
    </>
  );
};
