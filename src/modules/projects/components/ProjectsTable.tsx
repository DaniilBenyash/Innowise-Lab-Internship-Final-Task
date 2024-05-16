import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "shared/components/Table";
import { P } from "shared/components/Typography";
import { ProjectTableRow } from "./ProjectTableRow";
import { ConfirmationModal } from "shared/components/ConfirmationModal";
import { Project, RequestedProject } from "../hooks";
import { TableOrder } from "shared/hooks/useTableSorting";
import { ManageModalPositions } from "./ManageModalProjects";
import { FormSubmitHandler } from "react-hook-form";

type ProjectTableProps = {
  rows: Project[];
  tableOrder: TableOrder;
  handleRequestUpdateProject: (id: string, project: RequestedProject) => void;
  handleRequestProjectDelete: (id: string) => void;
};

const ProjectsTable = ({
  rows,
  handleRequestUpdateProject,
  handleRequestProjectDelete,
  tableOrder,
}: ProjectTableProps) => {
  const [project, setProject] = useState<Project>();
  const [isOpenRemoveModal, setRemoveModalVisibility] = useState(false);
  const [isOpenUpdateModal, setUpdateModalVisibility] = useState(false);
  const { t } = useTranslation();

  const handleProjectRemoveModalVisibility = () => {
    setRemoveModalVisibility(visibility => !visibility);
  };

  const handleProjectUpdateModalVisibility = () => {
    setUpdateModalVisibility(visibility => !visibility);
  };

  const initialValues: RequestedProject = useMemo(() => {
    return {
      name: project?.name,
      internalName: project?.internalName,
      domain: project?.domain,
      startDate: project?.startDate,
      endDate: project?.endDate,
      teamSize: project?.teamSize ?? "1",
      description: project?.description,
    };
  }, [project]);

  const handleSubmitProjectCreate: FormSubmitHandler<RequestedProject> = ({
    data,
  }) => {
    handleRequestUpdateProject(project.id, data);
    handleProjectUpdateModalVisibility();
  };

  const handleUpdateProject = useCallback((project: Project) => {
    setProject(project);
    handleProjectUpdateModalVisibility();
  }, []);

  const handleRemoveProject = useCallback((project: Project) => {
    setProject(project);
    handleProjectRemoveModalVisibility();
  }, []);

  const handleRequestProjectRemove = () => {
    handleRequestProjectDelete(project.id);
    handleProjectRemoveModalVisibility();
  };

  return (
    <>
      {project && (
        <>
          <ManageModalPositions
            isOpen={isOpenUpdateModal}
            handleClose={handleProjectUpdateModalVisibility}
            title={t("project.update")}
            buttonTitle={t("common.update")}
            handleSubmit={handleSubmitProjectCreate}
            initialValues={initialValues}
          />
          <ConfirmationModal
            isOpen={isOpenRemoveModal}
            handleClose={handleProjectRemoveModalVisibility}
            title={t("project.delete")}
            description={t("project.confirmation")}
            handleRequest={handleRequestProjectRemove}
            confirmationText={project?.name}
          />
        </>
      )}
      <Table tableOrder={tableOrder} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel sortingValue="name">
                <P size="medium" fontWeight="bold">
                  {t("common.name")}
                </P>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel sortingValue="internalName">
                <P size="medium" fontWeight="bold">
                  {t("project.internal")}
                </P>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel sortingValue="domain">
                <P size="medium" fontWeight="bold">
                  {t("project.domain")}
                </P>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel sortingValue="startDate">
                <P size="medium" fontWeight="bold">
                  {t("project.startDate")}
                </P>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel sortingValue="endDate">
                <P size="medium" fontWeight="bold">
                  {t("project.endDate")}
                </P>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel sortingValue="teamSize">
                <P size="medium" fontWeight="bold">
                  {t("project.teamSize")}
                </P>
              </TableSortLabel>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <ProjectTableRow
                key={row.id}
                row={row}
                handleUpdateProject={handleUpdateProject}
                handleRemoveProject={handleRemoveProject}
              />
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export { ProjectsTable };
