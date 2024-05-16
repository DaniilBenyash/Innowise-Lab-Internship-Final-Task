import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { EllipsisMenu, MenuItem } from "shared/components/EllipsisMenu";
import { TableCell, TableRow } from "shared/components/Table";
import { P } from "shared/components/Typography";
import { Project } from "modules/projects/hooks";
import { Link } from "shared/components/Link";
import { useAuth } from "modules/common/utils";

type ProjectTableRowProps = {
  row: Project;
  handleUpdateProject: (project: Project) => void;
  handleRemoveProject: (project: Project) => void;
};

const ProjectTableRow = memo(
  ({ row, handleUpdateProject, handleRemoveProject }: ProjectTableRowProps) => {
    const { t } = useTranslation();

    const handleUpdate = () => {
      handleUpdateProject(row);
    };
    const handleRemove = () => {
      handleRemoveProject(row);
    };

    const { isAdmin } = useAuth();

    return (
      <TableRow>
        <TableCell>
          <P size="medium">{row.name}</P>
        </TableCell>
        <TableCell>
          <P size="medium">{row.internalName}</P>
        </TableCell>
        <TableCell>
          <P size="medium">{row.domain}</P>
        </TableCell>
        <TableCell>
          <P size="medium">{row.startDate}</P>
        </TableCell>
        <TableCell>
          <P size="medium">
            {row.endDate ? row.endDate : t("project.tillNow")}
          </P>
        </TableCell>
        <TableCell>
          <P size="medium">{row.teamSize}</P>
        </TableCell>
        <TableCell width="1%">
          <EllipsisMenu>
            <Link to={row.id}>
              <MenuItem>{t("project.title")}</MenuItem>
            </Link>
            <MenuItem disabled={!isAdmin} onClick={handleUpdate}>
              {t("project.update")}
            </MenuItem>
            <MenuItem disabled={!isAdmin} onClick={handleRemove}>
              {t("project.delete")}
            </MenuItem>
          </EllipsisMenu>
        </TableCell>
      </TableRow>
    );
  },
);

ProjectTableRow.displayName = "projectTableRow";
export { ProjectTableRow };
