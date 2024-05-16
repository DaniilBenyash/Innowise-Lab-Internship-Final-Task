import React from "react";
import { Page } from "shared/components/Page";
import { TableDepartments } from "modules/departments/components/TableDepartments";
import { useGetDepartments } from "modules/common/hooks";
import { Loader } from "shared/components/Loader";
import { SearchableTable } from "shared/components/SearchableTable";
import { CreateDepartmentModal } from "modules/departments/components/CreateDepartmentModal";
import {
  useDeleteDepartment,
  useUpdateDepartments,
  useCreateDepartment,
} from "modules/departments/hooks";
import { useAuth } from "modules/common/utils";

const DepartmentsPage = () => {
  const { loading: loadingDepartments, departments } = useGetDepartments();
  const { loading: loadingCreateDepartment, handleCreateDepartment } =
    useCreateDepartment();
  const { loading: loadingUpdateDepartment, handleUpdateDepartment } =
    useUpdateDepartments();
  const { loading: loadingDeleteDepartment, handleDeleteDepartment } =
    useDeleteDepartment();

  const { isAdmin } = useAuth();

  const loading =
    loadingDepartments ||
    loadingCreateDepartment ||
    loadingUpdateDepartment ||
    loadingDeleteDepartment;

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
        tableData={departments}
        tableComponent={(tableRows, tableOrder) => (
          <TableDepartments
            rows={tableRows}
            tableOrder={tableOrder}
            handleUpdateDepartment={handleUpdateDepartment}
            handleDeleteDepartment={handleDeleteDepartment}
          />
        )}
      >
        {isAdmin && (
          <CreateDepartmentModal
            handleRequestDepartmentCreate={handleCreateDepartment}
          />
        )}
      </SearchableTable>
    </Page>
  );
};

export { DepartmentsPage };
