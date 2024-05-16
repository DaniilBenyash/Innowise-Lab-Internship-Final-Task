import React, { useMemo, useState } from "react";
import { Page } from "shared/components/Page";
import { useTranslation } from "react-i18next";
import { TableCVProjects, ModalCVProjects } from "modules/cvs/components";
import { Button } from "shared/components/Button";
import { P } from "shared/components/Typography";
import { useParams } from "react-router";
import { useGetCV } from "modules/cvs/hooks/useGetCV";
import { useGetProjects } from "modules/projects/hooks";
import { SearchableTable } from "shared/components/SearchableTable";
import { Loader } from "shared/components/Loader";
import { useUpdateCV } from "modules/common/hooks/useUpdateCV";
import { CV } from "modules/common/types/types";
import { useAuth } from "modules/common/utils";

export const CVProjectsPage = () => {
  const { t } = useTranslation();
  const { projects } = useGetProjects();
  const { id } = useParams();
  const { userId, isAdmin } = useAuth();

  const { cv, loading: loadingGetCV } = useGetCV(id);
  const { handleUpdateCV, loading: loadingUpdateCV } = useUpdateCV();

  const inititalCV: CV = useMemo(() => {
    return {
      id: cv?.id,
      name: cv?.name,
      description: cv?.description,
      userId: cv?.user?.id,
      isTemplate: true,
      languages: cv?.languages || [],
      skills: cv?.skills || [],
      projectsIds: cv?.projects?.map(project => project.id) || [],
    };
  }, [cv]);

  const handleUpdate = (projectId: string) => {
    const dataCv: CV = {
      ...inititalCV,
      projectsIds: [...inititalCV.projectsIds, projectId],
    };
    handleUpdateCV(cv?.user?.id, dataCv);
  };

  const handleDelete = (projectId: string) => {
    const dataCv: CV = {
      ...inititalCV,
      projectsIds: inititalCV.projectsIds.filter(id => id !== projectId),
    };
    handleUpdateCV(cv?.user?.id, dataCv);
  };

  const [isOpenedModalCVProjects, setIsOpenedModalCVProjects] = useState(false);

  const handleCloseModalCVProjects = () => setIsOpenedModalCVProjects(false);

  const handleOpenModalCVProjects = () => setIsOpenedModalCVProjects(true);

  const isOwner = userId === cv?.user?.id || isAdmin;

  return (
    <>
      {loadingGetCV || loadingUpdateCV ? (
        <Page isCentered>
          <Loader />
        </Page>
      ) : (
        <Page>
          <SearchableTable
            searchByColumn="name"
            tableData={cv?.projects}
            tableComponent={(tableRows, tableOrder) => (
              <TableCVProjects
                rows={tableRows}
                tableOrder={tableOrder}
                userId={cv?.user?.id}
                onDelete={handleDelete}
              />
            )}
          >
            {isOwner && (
              <>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleOpenModalCVProjects}
                >
                  <P size="large" upperCase fontWeight="bold">
                    {t("cvProjectsPage.addProject")}
                  </P>
                </Button>
                <ModalCVProjects
                  isOpen={isOpenedModalCVProjects}
                  handleClose={handleCloseModalCVProjects}
                  projects={projects}
                  onUpdate={handleUpdate}
                />
              </>
            )}
          </SearchableTable>
        </Page>
      )}
    </>
  );
};
