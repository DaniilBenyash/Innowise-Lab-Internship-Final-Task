import React from "react";
import { Page } from "shared/components/Page";
import {
  useCreateProject,
  useGetProjects,
  useDeleteProject,
} from "modules/projects/hooks";

import { useUpdateProject } from "../hooks/useUpdateProjects";
import { Loader } from "shared/components/Loader";
import { SearchableTable } from "shared/components/SearchableTable";
import { CreateProjectModal, ProjectsTable } from "../components";
import { useAuth } from "modules/common/utils";

const ProjectsPage = () => {
  const { projects, loading: loadingProjects } = useGetProjects();

  const { isAdmin } = useAuth();

  const { handleUpdateProject, loading: loadingUpdateProject } =
    useUpdateProject();

  const { handleProjectDelete, loading: loadingDeleteProject } =
    useDeleteProject();

  const { handleCreateProject, loading: loadingCreateProject } =
    useCreateProject();

  const loading =
    loadingProjects ||
    loadingUpdateProject ||
    loadingDeleteProject ||
    loadingCreateProject;

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
        tableData={projects}
        tableComponent={(tableRows, tableOrder) => (
          <ProjectsTable
            rows={tableRows}
            tableOrder={tableOrder}
            handleRequestProjectDelete={handleProjectDelete}
            handleRequestUpdateProject={handleUpdateProject}
          />
        )}
      >
        {isAdmin && (
          <CreateProjectModal
            handleRequestCreateProject={handleCreateProject}
          />
        )}
      </SearchableTable>
    </Page>
  );
};

export { ProjectsPage };
