import React from "react";
import {
  useGetLanguages,
  useCreateLanguage,
  useUpdateLanguage,
  useDeleteLanguage,
} from "modules/languages/hooks";
import { Page } from "shared/components/Page";
import { CreateLanguageModal, LanguagesTable } from "../components";
import { SearchableTable } from "shared/components/SearchableTable";
import { Loader } from "shared/components/Loader";
import { useAuth } from "modules/common/utils";

const LanguagesPage = () => {
  const { languages, loading: loadingLanguages } = useGetLanguages();
  const { handleRequestCreateLanguage, loading: loadingCreateLanguage } =
    useCreateLanguage();
  const { handleRequestUpdateLanguage, loading: loadingUpdateLanguage } =
    useUpdateLanguage();
  const { handleRequestDeleteLanguage, loading: loadingDeleteLanguage } =
    useDeleteLanguage();

  const { isAdmin } = useAuth();

  const loading =
    loadingLanguages ||
    loadingCreateLanguage ||
    loadingUpdateLanguage ||
    loadingDeleteLanguage;

  if (loading) {
    return (
      <Page isCentered>
        <Loader />
      </Page>
    );
  }
  return (
    <Page>
      <SearchableTable
        searchByColumn="name"
        tableData={languages}
        tableComponent={(tableRows, tableOrder) => (
          <LanguagesTable
            rows={tableRows}
            tableOrder={tableOrder}
            handleRequestDeleteLanguage={handleRequestDeleteLanguage}
            handleRequestUpdateLanguage={handleRequestUpdateLanguage}
          />
        )}
      >
        {isAdmin && (
          <CreateLanguageModal
            handleRequestCreateLanguage={handleRequestCreateLanguage}
          />
        )}
      </SearchableTable>
    </Page>
  );
};

export { LanguagesPage };
