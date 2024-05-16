import React from "react";
import {
  useCreateSkill,
  useDeleteSkill,
  useGetSkills,
  useUpdateSkill,
} from "modules/skills/hooks";
import { Page } from "shared/components/Page";
import { SkillsTable, CreateSkillModal } from "modules/skills/components";
import { SearchableTable } from "shared/components/SearchableTable";
import { Loader } from "shared/components/Loader";
import { useAuth } from "modules/common/utils";

const SkillsPage = () => {
  const { loading: loadingSkills, skills } = useGetSkills();

  const { isAdmin } = useAuth();

  const { handleRequestDeleteSkill, loading: loadingDeleteSkill } =
    useDeleteSkill();
  const { handleRequestCreateSkill, loading: loadingCreateSkill } =
    useCreateSkill();
  const { handleRequestUpdateSkill, loading: loadingUpdateSkill } =
    useUpdateSkill();

  const loading =
    loadingDeleteSkill ||
    loadingCreateSkill ||
    loadingUpdateSkill ||
    loadingSkills;

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
        tableData={skills}
        tableComponent={(tableRows, tableOrder) => (
          <SkillsTable
            rows={tableRows}
            tableOrder={tableOrder}
            handleRequestDeleteSkill={handleRequestDeleteSkill}
            handleRequestUpdateSkill={handleRequestUpdateSkill}
          />
        )}
      >
        {isAdmin && (
          <CreateSkillModal
            handleRequestCreateSkill={handleRequestCreateSkill}
          />
        )}
      </SearchableTable>
    </Page>
  );
};

export { SkillsPage };
