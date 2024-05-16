import React, { useCallback, useDeferredValue, useMemo, useState } from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableSortLabel,
} from "shared/components/Table";
import { TableOrder } from "shared/hooks/useTableSorting";
import { Skill } from "modules/skills/hooks";
import { useTranslation } from "react-i18next";
import { SkillTableRow } from "./SkillTableRow";
import { InitialValue } from "modules/skills/types";
import { FormSubmitHandler } from "react-hook-form";
import { ConfirmationModal } from "shared/components/ConfirmationModal";
import { ManageModalSkill } from "./ManageModalSkill";

type SkillsTableProps = {
  rows: Skill[];
  tableOrder: TableOrder;
  handleRequestUpdateSkill: (id: string, name: string) => void;
  handleRequestDeleteSkill: (id: string) => void;
};

const SkillsTable = ({
  rows,
  tableOrder,
  handleRequestUpdateSkill,
  handleRequestDeleteSkill,
}: SkillsTableProps) => {
  const resultTable = useDeferredValue(rows);
  const [skill, setSkill] = useState<Skill>();

  const [isOpenUpdateModal, setUpdateModalVisibility] = useState(false);
  const [isOpenRemoveModal, setRemoveModalVisibility] = useState(false);
  const { t } = useTranslation();

  const handleSkillUpdateModalVisibility = () => {
    setUpdateModalVisibility(visibility => !visibility);
  };

  const handleSkillDeleteModalVisibility = () => {
    setRemoveModalVisibility(visibility => !visibility);
  };

  const handleUpdateSkill = useCallback((skill: Skill) => {
    setSkill(skill);
    handleSkillUpdateModalVisibility();
  }, []);

  const handleRemoveSkill = useCallback((skill: Skill) => {
    setSkill(skill);
    handleSkillDeleteModalVisibility();
  }, []);

  const initialValues: InitialValue = useMemo(() => {
    return {
      name: skill?.name,
    };
  }, [skill]);

  const handleSkillUpdate: FormSubmitHandler<InitialValue> = ({ data }) => {
    handleRequestUpdateSkill(skill.id, data.name);
    handleSkillUpdateModalVisibility();
  };

  const handleRequestSkillRemove = () => {
    handleRequestDeleteSkill(skill.id);
    handleSkillDeleteModalVisibility();
  };

  return (
    <>
      {skill && (
        <>
          <ConfirmationModal
            isOpen={isOpenRemoveModal}
            handleClose={handleSkillDeleteModalVisibility}
            handleRequest={handleRequestSkillRemove}
            title={t("skills.delete")}
            confirmationText={skill?.name}
            description={t("skills.agree")}
          />
          <ManageModalSkill
            handleClose={handleSkillUpdateModalVisibility}
            isOpen={isOpenUpdateModal}
            handleSubmit={handleSkillUpdate}
            initialValues={initialValues}
            title={t("skills.update")}
            buttonTitle={t("formModal.update")}
            skill={skill}
          />
        </>
      )}
      <Table tableOrder={tableOrder}>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel sortingValue="name">
                {t("formModal.name")}
              </TableSortLabel>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {resultTable.map(row => (
            <SkillTableRow
              key={row.id}
              row={row}
              handleRemoveSkill={handleRemoveSkill}
              handleUpdateSkill={handleUpdateSkill}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export { SkillsTable };
