import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "shared/components/Table";
import { Language } from "../hooks";
import { TableOrder } from "shared/hooks/useTableSorting";
import { P } from "shared/components/Typography";
import { useTranslation } from "react-i18next";
import { LanguagesTableRow } from "./LanguagesTableRow";
import { FormSubmitHandler } from "react-hook-form";
import { ConfirmationModal } from "shared/components/ConfirmationModal";
import { ManageModalLanguage } from "./ManageModalLanguage";
import { InitialValues } from "modules/languages/types";

type LanguagesTableProps = {
  rows: Language[];
  tableOrder: TableOrder;
  handleRequestUpdateLanguage: (id: string, language: InitialValues) => void;
  handleRequestDeleteLanguage: (id: string) => void;
};

const LanguagesTable = ({
  tableOrder,
  rows,
  handleRequestDeleteLanguage,
  handleRequestUpdateLanguage,
}: LanguagesTableProps) => {
  const [language, setLanguage] = useState<Language>();
  const [isOpenUpdateModal, setUpdateModalVisibility] = useState(false);
  const [isOpenRemoveModal, setRemoveModalVisibility] = useState(false);
  const { t } = useTranslation();

  const initialValues: InitialValues = useMemo(() => {
    return {
      name: language?.name,
      nativeName: language?.nativeName,
      iso2: language?.iso2,
    };
  }, [language]);

  const handleLanguageUpdateModalVisibility = () => {
    setUpdateModalVisibility(visibility => !visibility);
  };

  const handleLanguageRemoveModalVisibility = () => {
    setRemoveModalVisibility(visibility => !visibility);
  };

  const handleUpdateLanguage = useCallback((language: Language) => {
    setLanguage(language);
    handleLanguageUpdateModalVisibility();
  }, []);

  const handleRemoveLanguage = useCallback((language: Language) => {
    setLanguage(language);
    handleLanguageRemoveModalVisibility();
  }, []);

  const handleLanguageUpdate: FormSubmitHandler<InitialValues> = ({ data }) => {
    handleRequestUpdateLanguage(language.id, data);
    handleLanguageUpdateModalVisibility();
  };

  const handleRequestRemoveLanguage = () => {
    handleRequestDeleteLanguage(language.id);
    handleLanguageRemoveModalVisibility();
  };
  return (
    <>
      {language && (
        <>
          <ManageModalLanguage
            isOpen={isOpenUpdateModal}
            handleClose={handleLanguageUpdateModalVisibility}
            title={t("language.update")}
            buttonTitle={t("common.update")}
            handleSubmit={handleLanguageUpdate}
            initialValues={initialValues}
          />
          <ConfirmationModal
            isOpen={isOpenRemoveModal}
            handleClose={handleLanguageRemoveModalVisibility}
            handleRequest={handleRequestRemoveLanguage}
            description={t("language.confirmation")}
            confirmationText={language?.name}
            title={t("language.delete")}
          />
        </>
      )}

      <Table tableOrder={tableOrder}>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel sortingValue="name">
                <P size="medium" fontWeight="bold">
                  {t("formModal.name")}
                </P>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <P size="medium" fontWeight="bold">
                {t("language.nativeName")}
              </P>
            </TableCell>
            <TableCell>
              <P size="medium" upperCase fontWeight="bold">
                {t("language.iso2")}
              </P>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <LanguagesTableRow
                key={row.id}
                row={row}
                handleUpdateLanguage={handleUpdateLanguage}
                handleRemoveLanguage={handleRemoveLanguage}
              />
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export { LanguagesTable };
