import { Position } from "modules/common/types";
import { useAuth } from "modules/common/utils";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { EllipsisMenu, MenuItem } from "shared/components/EllipsisMenu";
import { TableCell, TableRow } from "shared/components/Table";
import { P } from "shared/components/Typography";

type TableBodyRowProps = {
  row: Position;
  handleUpdatePosition: (position: Position) => void;
  handleRemovePosition: (position: Position) => void;
};

const PositionTableRow = memo(
  ({ row, handleUpdatePosition, handleRemovePosition }: TableBodyRowProps) => {
    const { isAdmin } = useAuth();

    const handleUpdate = () => handleUpdatePosition(row);
    const handleRemove = () => handleRemovePosition(row);
    const { t } = useTranslation();
    return (
      <TableRow>
        <TableCell>
          <P size="medium">{row.name}</P>
        </TableCell>
        <TableCell width="1%">
          <EllipsisMenu>
            <MenuItem disabled={!isAdmin} onClick={handleUpdate}>
              {t("position.update")}
            </MenuItem>
            <MenuItem disabled={!isAdmin} onClick={handleRemove}>
              {t("position.delete")}
            </MenuItem>
          </EllipsisMenu>
        </TableCell>
      </TableRow>
    );
  },
);

PositionTableRow.displayName = "positionTableRow";
export { PositionTableRow };
