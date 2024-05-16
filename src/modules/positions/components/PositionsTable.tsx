import React, { useCallback, useDeferredValue, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "shared/components/Table";
import { ManageModalPositions } from "./ManageModalPositions";
import { ConfirmationModal } from "shared/components/ConfirmationModal";
import { useTranslation } from "react-i18next";
import { P } from "shared/components/Typography";
import { TableOrder } from "shared/hooks/useTableSorting";
import { PositionTableRow } from "./PositionTableRow";
import { InitialValue } from "modules/positions/types";
import { FormSubmitHandler } from "react-hook-form";
import { Position } from "modules/common/types";

type PositionsTableProps = {
  rows: Position[];
  tableOrder: TableOrder;
  handleRequestUpdatePositions: (id: string, name: string) => void;
  handlePositionDelete: (id: string) => void;
};

const PositionsTable = ({
  tableOrder,
  rows,
  handlePositionDelete,
  handleRequestUpdatePositions,
}: PositionsTableProps) => {
  const [position, setPosition] = useState<Position>();
  const [isOpenUpdateModal, setUpdateModalVisibility] = useState(false);
  const [isOpenRemoveModal, setRemoveModalVisibility] = useState(false);
  const { t } = useTranslation();

  const resultTable = useDeferredValue(rows);

  const handlePositionUpdateModalVisibility = () => {
    setUpdateModalVisibility(visibility => !visibility);
  };

  const handlePositionRemoveModalVisibility = () => {
    setRemoveModalVisibility(visibility => !visibility);
  };

  const handleRemovePosition = useCallback((position: Position) => {
    setPosition(position);
    handlePositionRemoveModalVisibility();
  }, []);

  const handleUpdatePosition = useCallback((value: Position) => {
    setPosition(value);
    handlePositionUpdateModalVisibility();
  }, []);

  const initialValues: InitialValue = useMemo(() => {
    return {
      name: position?.name,
    };
  }, [position]);

  const handlePositionUpdate: FormSubmitHandler<InitialValue> = ({ data }) => {
    handleRequestUpdatePositions(position.id, data.name);
    handlePositionUpdateModalVisibility();
  };

  const handleRequestRemovePosition = () => {
    handlePositionDelete(position.id);
    handlePositionRemoveModalVisibility();
  };

  return (
    <>
      {position && (
        <>
          <ManageModalPositions
            initialValues={initialValues}
            isOpen={isOpenUpdateModal}
            handleClose={handlePositionUpdateModalVisibility}
            title={t("position.update")}
            buttonTitle={t("common.update")}
            handleSubmit={handlePositionUpdate}
          />
          <ConfirmationModal
            isOpen={isOpenRemoveModal}
            handleClose={handlePositionRemoveModalVisibility}
            confirmationText={position?.name}
            description={t("position.confirmation")}
            title={t("position.delete")}
            handleRequest={handleRequestRemovePosition}
          />
        </>
      )}
      <Table tableOrder={tableOrder} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel sortingValue="name">
                <P size="medium" fontWeight="bold">
                  {t("common.name")}
                </P>
              </TableSortLabel>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {resultTable.map(row => {
            return (
              <PositionTableRow
                key={row.id}
                row={row}
                handleUpdatePosition={handleUpdatePosition}
                handleRemovePosition={handleRemovePosition}
              />
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export { PositionsTable };
