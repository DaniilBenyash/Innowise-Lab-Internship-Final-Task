import React, { useMemo, useState } from "react";
import { Page } from "shared/components/Page";
import { Button } from "shared/components/Button";
import { useTranslation } from "react-i18next";
import { TableCVs, ManageModalCV } from "modules/cvs/components";
import { useGetCVs } from "modules/cvs/hooks/useGetCVs";
import AddIcon from "@mui/icons-material/Add";
import { Loader } from "shared/components/Loader";
import { SearchableTable } from "shared/components/SearchableTable";
import { useDeleteCV } from "modules/cvs/hooks/useDeleteCV";
import { useCreateCV } from "modules/cvs/hooks/useCreateCV";
import { CV } from "modules/common/types";

export const CVsPage = () => {
  const { t } = useTranslation();

  const { cvs, loading: loadignGetCV } = useGetCVs();

  const { handleDeleteCV, loading: loadingDeleteCV } = useDeleteCV();

  const { handleCreateCV, loading: loadingCreateCV } = useCreateCV();

  const [isOpenedModalCV, setIsOpenedModalCV] = useState(false);

  const handleCloseModalCV = () => setIsOpenedModalCV(false);

  const handleOpenModalCV = () => setIsOpenedModalCV(true);

  const initialValue: CV = useMemo(() => {
    return {
      name: "",
      description: "",
      userId: "",
      isTemplate: true,
      languages: [],
      skills: [],
      projectsIds: [],
    };
  }, []);

  return (
    <>
      {loadignGetCV || loadingDeleteCV || loadingCreateCV ? (
        <Page isCentered>
          <Loader />
        </Page>
      ) : (
        <Page>
          <SearchableTable
            searchByColumn="name"
            tableData={cvs}
            tableComponent={(tableRows, tableOrder) => (
              <TableCVs
                rows={tableRows}
                tableOrder={tableOrder}
                onDelete={handleDeleteCV}
              />
            )}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleOpenModalCV}
              roundBorders>
              <AddIcon />
              {t("cvsPage.createCV")}
            </Button>
            <ManageModalCV
              isOpen={isOpenedModalCV}
              handleClose={handleCloseModalCV}
              variant="create"
              onCreateCV={handleCreateCV}
              initialValue={initialValue}
            />
          </SearchableTable>
        </Page>
      )}
    </>
  );
};
