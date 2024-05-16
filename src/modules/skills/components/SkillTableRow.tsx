import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { EllipsisMenu, MenuItem } from "shared/components/EllipsisMenu";
import { TableCell, TableRow } from "shared/components/Table";
import { Skill } from "../hooks";
import { useAuth } from "modules/common/utils";

type SkillTableRowProps = {
  row: Skill;
  handleUpdateSkill: (skill: Skill) => void;
  handleRemoveSkill: (skill: Skill) => void;
};

const SkillTableRow = memo(
  ({ row, handleUpdateSkill, handleRemoveSkill }: SkillTableRowProps) => {
    const { isAdmin } = useAuth();

    const { t } = useTranslation();
    return (
      <TableRow>
        <TableCell>{row.name}</TableCell>
        <TableCell width="1%">
          <EllipsisMenu>
            <MenuItem
              disabled={!isAdmin}
              onClick={() => handleUpdateSkill(row)}
            >
              {t("skills.update")}
            </MenuItem>
            <MenuItem
              disabled={!isAdmin}
              onClick={() => handleRemoveSkill(row)}
            >
              {t("skills.delete")}
            </MenuItem>
          </EllipsisMenu>
        </TableCell>
      </TableRow>
    );
  },
);

SkillTableRow.displayName = "rowBody";
export { SkillTableRow };
