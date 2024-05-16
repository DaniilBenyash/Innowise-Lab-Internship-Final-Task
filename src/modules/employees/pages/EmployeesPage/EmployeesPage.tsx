import React from "react";
import {
  CreateEmployeeModal,
  EmployeesTable,
} from "modules/employees/components";
import { Page } from "shared/components/Page";
import {
  useDeleteUser,
  useGetUsers,
  useUpdateUser,
  useCreateUser,
} from "modules/employees/hooks";
import { Loader } from "shared/components/Loader";
import { SearchableTable } from "shared/components/SearchableTable";
import { EmployeesTableData } from "modules/employees/types";
import { useAuth } from "modules/common/utils";

const EmployeesPage = () => {
  const { users, loading: loadingUsers } = useGetUsers();
  const { isAdmin } = useAuth();

  const tableData: EmployeesTableData[] = users.map(user => {
    return {
      id: user.id,
      email: user.email,
      department: user.department,
      position: user.position,
      departmentName: user.departmentName,
      positionName: user.positionName,
      lastName: user.profile.lastName,
      role: user.role,
      firstName: user.profile.firstName,
      profile: {
        fullName: user.profile.fullName,
        avatar: user.profile.avatar,
        skills: user.profile.skills,
        languages: user.profile.languages,
      },
      cvsId: user.cvs.map(cv => cv.id),
    };
  });

  const { handleRequestUpdateUser, loading: updateUserLoading } =
    useUpdateUser();
  const { handleRequestDeleteUser, loading: deleteUserLoading } =
    useDeleteUser();
  const { handleRequestCreateUser, loading: createUserLoading } =
    useCreateUser();

  const loading =
    loadingUsers || updateUserLoading || deleteUserLoading || createUserLoading;

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
        searchByColumn="firstName"
        tableData={tableData}
        tableComponent={(tableRows, tableOrder) => (
          <EmployeesTable
            rows={tableRows}
            tableOrder={tableOrder}
            handleRequestDeleteUser={handleRequestDeleteUser}
            handleRequestUpdateUser={handleRequestUpdateUser}
          />
        )}
      >
        {isAdmin && (
          <CreateEmployeeModal
            handleRequestCreateUser={handleRequestCreateUser}
          />
        )}
      </SearchableTable>
    </Page>
  );
};

export { EmployeesPage };
