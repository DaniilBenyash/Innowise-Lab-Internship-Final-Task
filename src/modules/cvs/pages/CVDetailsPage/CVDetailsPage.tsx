import React, { useMemo, useState } from "react";
import { Page } from "shared/components/Page";
import { Button } from "shared/components/Button";
import { useTranslation } from "react-i18next";
import { P } from "shared/components/Typography";
import { BodyCVDetails } from "./components";
import { Box } from "shared/components/Box";
import { useGetCV } from "modules/cvs/hooks/useGetCV";
import { useParams } from "react-router";
import { ManageModalCV } from "modules/cvs/components";
import { Loader } from "shared/components/Loader";
import { useUpdateCV } from "modules/common/hooks/useUpdateCV";
import { useAuth } from "modules/common/utils";
import { CV } from "modules/common/types";

export const CVDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { cv, loading: loadingGetCV } = useGetCV(id);
  const { handleUpdateCV, loading: loadingUpdateCV } = useUpdateCV();
  const { userId, isAdmin } = useAuth();

  const [isOpenedModalCV, setIsOpenedModalCV] = useState(false);

  const handleCloseModalCV = () => setIsOpenedModalCV(false);

  const handleOpenModalCV = () => setIsOpenedModalCV(true);

  const initialValue: CV = useMemo(() => {
    return {
      id: cv?.id,
      name: cv?.name,
      description: cv?.description,
      userId: cv?.user?.id || userId,
      isTemplate: true,
      languages: cv?.languages,
      skills: cv?.skills,
      projectsIds: cv?.projects.map(project => project.id),
    };
  }, [cv]);

  const isOwner = userId === cv?.user?.id || isAdmin;
  return (
    <>
      {loadingGetCV || loadingUpdateCV ? (
        <Page isCentered>
          <Loader />
        </Page>
      ) : (
        <Page>
          <BodyCVDetails cv={cv} />
          {isOwner && (
            <>
              <Box paddingTop={20}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleOpenModalCV}
                >
                  <P size="large" upperCase fontWeight="bold">
                    {t("CVDetailsPage.updateCV")}
                  </P>
                </Button>
              </Box>
              <ManageModalCV
                isOpen={isOpenedModalCV}
                handleClose={handleCloseModalCV}
                variant="update"
                cv={cv}
                onUpdateCV={handleUpdateCV}
                initialValue={initialValue}
              />
            </>
          )}
        </Page>
      )}
    </>
  );
};
