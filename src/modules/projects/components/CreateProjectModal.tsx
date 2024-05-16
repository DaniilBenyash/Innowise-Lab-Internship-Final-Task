import React, { memo, useMemo, useState } from "react";
import { Button } from "shared/components/Button";
import AddIcon from "@mui/icons-material/Add";
import { FormSubmitHandler } from "react-hook-form";
import { ManageModalPositions } from "modules/projects/components";
import { RequestedProject } from "../hooks";
import { useTranslation } from "react-i18next";

type CreateProjectModalProps = {
  handleRequestCreateProject: (project: RequestedProject) => void;
};

const CreateProjectModal = memo(
  ({ handleRequestCreateProject }: CreateProjectModalProps) => {
    const [isOpenCreateModal, setCreateModalVisibility] = useState(false);
    const { t } = useTranslation();

    const handleControlModalProjectCreate = () => {
      setCreateModalVisibility(visibility => !visibility);
    };

    const initialValues: RequestedProject = useMemo(() => {
      return {
        name: "",
        internalName: "",
        domain: "",
        startDate: "",
        endDate: "",
        teamSize: "1",
        description: "",
      };
    }, []);

    const handleProjectCreate: FormSubmitHandler<RequestedProject> = ({
      data,
    }) => {
      handleRequestCreateProject(data);
      handleControlModalProjectCreate();
    };

    return (
      <>
        <ManageModalPositions
          isOpen={isOpenCreateModal}
          handleClose={handleControlModalProjectCreate}
          title={t("project.create")}
          buttonTitle={t("common.create")}
          handleSubmit={handleProjectCreate}
          initialValues={initialValues}
        />
        <Button
          roundBorders
          onClick={handleControlModalProjectCreate}
          variant="outlined"
          color="secondary"
        >
          <AddIcon />
          {t("project.create")}
        </Button>
      </>
    );
  },
);

CreateProjectModal.displayName = "createProjectModal";
export { CreateProjectModal };
