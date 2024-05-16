import React, { memo, useState } from "react";
import { ManageModalSkill } from "./ManageModalSkill";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { Button } from "shared/components/Button";
import { FormSubmitHandler } from "react-hook-form";
import { InitialValue } from "modules/skills/types";

type CreateSkillModalProps = {
  handleRequestCreateSkill: (name: string) => void;
};

const CreateSkillModal = memo(
  ({ handleRequestCreateSkill }: CreateSkillModalProps) => {
    const { t } = useTranslation();
    const [isOpenCreateModal, setCreateModalVisibility] = useState(false);

    const handleSkillCreateModalVisibility = () => {
      setCreateModalVisibility(visibility => !visibility);
    };

    const handleSubmitSkillCreate: FormSubmitHandler<InitialValue> = ({
      data,
    }) => {
      handleRequestCreateSkill(data.name);
      handleSkillCreateModalVisibility();
    };
    return (
      <>
        <ManageModalSkill
          handleClose={handleSkillCreateModalVisibility}
          isOpen={isOpenCreateModal}
          handleSubmit={handleSubmitSkillCreate}
          title={t("skills.create")}
          buttonTitle={t("formModal.create")}
        />
        <Button
          onClick={handleSkillCreateModalVisibility}
          variant="outlined"
          color="secondary"
          roundBorders
        >
          <AddIcon />
          {t("skills.create")}
        </Button>
      </>
    );
  },
);

CreateSkillModal.displayName = "createSkillModal";
export { CreateSkillModal };
