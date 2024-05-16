import React, { useDeferredValue, useState } from "react";
import { useTableSorting } from "shared/hooks/useTableSorting";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from "shared/components/Table";
import { EmployeesCvsTableRows } from "./EmployeesCvsTableRows";
import { useTranslation } from "react-i18next";
import { ConfirmationModal } from "shared/components/ConfirmationModal";
import { CVUpdateModal } from "./CvUpdateModal";
import { useUnbindCV } from "modules/common/hooks/useUnbindCV";
import { FormSubmitHandler } from "react-hook-form";
import { CV } from "modules/common/types";
import { useUpdateCV } from "modules/common/hooks/useUpdateCV";
import { useParams } from "react-router";
import { Loader } from "shared/components/Loader";
import { Page } from "shared/components/Page";

type EmployeesCvsTableProps = {
  rows: CV[];
};

const EmployeesCvsTable = ({ rows }: EmployeesCvsTableProps) => {
  const { t } = useTranslation();
  const { tableOrder, tableRows } = useTableSorting(rows);
  const resultTable = useDeferredValue(tableRows);
  const { id } = useParams();
  const [CV, setCV] = useState<CV>();
  const [isOpenUnassignModal, setUnassignModalVisibility] = useState(false);
  const [isOpenUpdateModal, setUpdateModalVisibility] = useState(false);

  const { handleUnbindCV, loading: loadingUnbindCV } = useUnbindCV();
  const { handleUpdateCV, loading: loadingUpdateCV } = useUpdateCV();

  const loading = loadingUnbindCV || loadingUpdateCV;

  const handleCvsUnassignModalVisibility = () => {
    setUnassignModalVisibility(visibility => !visibility);
  };

  const handleCvsUpdateModalVisibility = () => {
    setUpdateModalVisibility(visibility => !visibility);
  };

  const handleUpdate = (cv: CV) => {
    setCV(cv);
    handleCvsUpdateModalVisibility();
  };

  const handleUnassign = (cv: CV) => {
    setCV(cv);
    handleCvsUnassignModalVisibility();
  };

  const handleRequestUnassignCV = () => {
    handleUnbindCV(CV.id);
    handleCvsUnassignModalVisibility();
  };

  const initialValues: CV = {
    id: CV?.id,
    name: CV?.name,
    description: CV?.description,
    isTemplate: CV?.isTemplate ? "Yes" : "No",
    languages: CV?.languages,
    skills: CV?.skills,
    projectsIds: CV?.projectsIds,
  };

  const handleRequestUpdateCV: FormSubmitHandler<CV> = ({ data }) => {
    handleUpdateCV(id, data);
    handleCvsUpdateModalVisibility();
  };

  if (loading) {
    return (
      <Page isCentered>
        <Loader />
      </Page>
    );
  }

  return (
    <>
      {CV && (
        <>
          <CVUpdateModal
            buttonTitle={t("formModal.update")}
            handleClose={handleCvsUpdateModalVisibility}
            isOpen={isOpenUpdateModal}
            title={t("CVDetailsPage.updateCV")}
            initialValues={initialValues}
            handleSubmit={handleRequestUpdateCV}
          />
          <ConfirmationModal
            isOpen={isOpenUnassignModal}
            handleClose={handleCvsUnassignModalVisibility}
            title={t("CVDetailsPage.unassign")}
            description={t("CVDetailsPage.acceptUnassign")}
            confirmationText={CV?.name}
            handleRequest={handleRequestUnassignCV}
          />
        </>
      )}
      <Table tableOrder={tableOrder}>
        <TableHead>
          <TableRow>
            <TableCell>{t("common.name")}</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {resultTable.map(row => {
            return (
              <EmployeesCvsTableRows
                key={row.id}
                row={row}
                handleUnassignCV={handleUnassign}
                handleUpdateCV={handleUpdate}
              />
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export { EmployeesCvsTable };
