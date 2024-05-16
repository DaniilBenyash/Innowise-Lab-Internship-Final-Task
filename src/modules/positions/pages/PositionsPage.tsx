import React from "react";
import { Page } from "shared/components/Page";
import { useCreatePosition, useDeletePosition } from "modules/positions/hooks";
import { useUpdatePosition } from "shared/hooks/apollo/useUpdatePosition";
import {
  CreatePositionModal,
  PositionsTable,
} from "modules/positions/components";
import { Loader } from "shared/components/Loader";
import { SearchableTable } from "shared/components/SearchableTable";
import { useGetPositions } from "modules/common/hooks";
import { useAuth } from "modules/common/utils";

const PositionsPage = () => {
  const { loading: loadingPositions, positions } = useGetPositions();
  const { loading: loadingUpdatePosition, handleRequestUpdatePositions } =
    useUpdatePosition();
  const { loading: loadingCreatePosition, handleRequestCreatePositions } =
    useCreatePosition();
  const { loading: loadingDeletePosition, handlePositionDelete } =
    useDeletePosition();

  const { isAdmin } = useAuth();

  const loading =
    loadingPositions ||
    loadingUpdatePosition ||
    loadingCreatePosition ||
    loadingDeletePosition;

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
        tableData={positions}
        tableComponent={(tableRows, tableOrder) => (
          <PositionsTable
            tableOrder={tableOrder}
            rows={tableRows}
            handlePositionDelete={handlePositionDelete}
            handleRequestUpdatePositions={handleRequestUpdatePositions}
          />
        )}
      >
        {isAdmin && (
          <CreatePositionModal
            handleRequestCreatePositions={handleRequestCreatePositions}
          />
        )}
      </SearchableTable>
    </Page>
  );
};

export { PositionsPage };
