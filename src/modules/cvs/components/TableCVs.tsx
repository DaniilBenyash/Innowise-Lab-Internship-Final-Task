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
import { Link } from "shared/components/Link";
import { CV_DETAILS_PAGE, CVS_PROJECTS_PAGE } from "app/routing/routing";
import { ReceivedCVs } from "../hooks/useGetCVs";
import { generatePath } from "react-router";

type TableCVsProps = {
  rows: ReceivedCVs;
  tableOrder: TableOrder;
  onDelete: (id: string) => void;
};

export const TableCVs = ({ rows, tableOrder, onDelete }: TableCVsProps) => {
  const { t } = useTranslation();

  return (
    <Table tableOrder={tableOrder} stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel sortingValue="name">
              {t("cvsPage.name")}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel sortingValue="description">
              {t("cvsPage.description")}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel sortingValue="email">
              {t("cvsPage.employee")}
            </TableSortLabel>
          </TableCell>
          <TableCell>Проекты</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {rows?.map(cv => {
          return (
            <TableRow key={cv.id}>
              <TableCell>
                <Link
                  to={generatePath(CV_DETAILS_PAGE, { id: cv.id })}
                  underline="always">
                  <P size="medium">{cv.name}</P>
                </Link>
              </TableCell>
              <TableCell>
                <P size="medium">{cv.description}</P>
              </TableCell>
              <TableCell>
                <P size="medium">{cv.user?.email}</P>
              </TableCell>
              <TableCell>
                <Link
                  to={generatePath(CVS_PROJECTS_PAGE, { id: cv.id })}
                  underline="always">
                  <P size="medium">{t("cvsPage.projects")}</P>
                </Link>
              </TableCell>
              <TableCell width="1%">
                <MenuCVs
                  userId={cv.user?.id}
                  onDelete={() => onDelete(cv.id)}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
