import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
} from "shared/components/Table";
import { TableOrder } from "shared/hooks/useTableSorting";
import { MenuCVs } from "./MenuCVs";
import { P } from "shared/components/Typography";
import { useTranslation } from "react-i18next";
import { ProjectCV } from "modules/common/types";

type TableCVProjectsProps = {
  userId: string;
  rows: ProjectCV[];
  tableOrder: TableOrder;
  onDelete: (id: string) => void;
};

export const TableCVProjects = ({
  rows,
  userId,
  tableOrder,
  onDelete,
}: TableCVProjectsProps) => {
  const { t } = useTranslation();

  return (
    <Table tableOrder={tableOrder} stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel sortingValue="name">
              {t("cvProjectsPage.name")}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel sortingValue="internalName">
              {t("cvProjectsPage.internalName")}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel sortingValue="domain">
              {t("cvProjectsPage.domain")}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel sortingValue="startDate">
              {t("cvProjectsPage.startDate")}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel sortingValue="endDate">
              {t("cvProjectsPage.endDate")}
            </TableSortLabel>
          </TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {rows?.map(project => {
          return (
            <TableRow key={project.id}>
              <TableCell>
                <P size="medium">{project.name}</P>
              </TableCell>
              <TableCell>
                <P size="medium">{project.internalName}</P>
              </TableCell>
              <TableCell>
                <P size="medium">{project.domain}</P>
              </TableCell>
              <TableCell>
                <P size="medium">{project.startDate}</P>
              </TableCell>
              <TableCell>
                <P size="medium">{project.endDate}</P>
              </TableCell>
              <TableCell width="1%">
                <MenuCVs
                  onDelete={() => onDelete(project.id)}
                  userId={userId}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
