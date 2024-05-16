import { useAuth } from "modules/common/utils";
import { Language } from "modules/languages/hooks";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { EllipsisMenu, MenuItem } from "shared/components/EllipsisMenu";
import { TableCell, TableRow } from "shared/components/Table";
import { P } from "shared/components/Typography";

type LanguagesTableRowProps = {
  row: Language;
  handleUpdateLanguage: (language: Language) => void;
  handleRemoveLanguage: (language: Language) => void;
};

const LanguagesTableRow = memo(
  ({
    row,
    handleUpdateLanguage,
    handleRemoveLanguage,
  }: LanguagesTableRowProps) => {
    const { t } = useTranslation();
    const { isAdmin } = useAuth();

    const handleUpdate = () => handleUpdateLanguage(row);
    const handleRemove = () => handleRemoveLanguage(row);

    return (
      <TableRow>
        <TableCell>
          <P size="medium">{row.name}</P>
        </TableCell>
        <TableCell>
          <P size="medium">{row.nativeName}</P>
        </TableCell>
        <TableCell>
          <P size="medium">{row.iso2}</P>
        </TableCell>
        <TableCell width="1%">
          <EllipsisMenu>
            <MenuItem disabled={!isAdmin} onClick={handleUpdate}>
              {t("language.update")}
            </MenuItem>
            <MenuItem disabled={!isAdmin} onClick={handleRemove}>
              {t("language.delete")}
            </MenuItem>
          </EllipsisMenu>
        </TableCell>
      </TableRow>
    );
  },
);

LanguagesTableRow.displayName = "languagesTableRow";

export { LanguagesTableRow };
