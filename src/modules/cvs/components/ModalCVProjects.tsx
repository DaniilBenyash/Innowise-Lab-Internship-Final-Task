import React from "react";
import { useTranslation } from "react-i18next";
import { FormModal } from "shared/components/FormModal";
import { FormSelectInput } from "shared/components/FormSelectInput";
import { FormSubmitHandler } from "react-hook-form";
import { Project } from "modules/projects/hooks";

export type InitialValue = { projectId: string };

type ModalCVProjectsProps = {
  onUpdate: (id: string) => void;
  projects: Project[];
  isOpen: boolean;
  handleClose: () => void;
};

export const ModalCVProjects = ({
  onUpdate,
  isOpen,
  handleClose,
  projects,
}: ModalCVProjectsProps) => {
  const { t } = useTranslation();

  const selectData = projects?.map(project => {
    return { value: project.id, label: project.name };
  });

  const initialValue = { projectId: "" };

  const handleSubmit: FormSubmitHandler<InitialValue> = ({ data }) => {
    onUpdate(data.projectId);
    handleClose();
  };

  return (
    <FormModal
      title={t("cvProjectsPage.addProject")}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      confirmButtonTitle={t("cvProjectsPage.add")}
      handleClose={handleClose}
      initialValues={initialValue}
    >
      <FormSelectInput
        fullWidth
        required
        name="projectId"
        values={selectData}
      />
    </FormModal>
  );
};
