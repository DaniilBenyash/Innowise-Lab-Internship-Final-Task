import React, { memo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "shared/components/Button";
import { FormSubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ManageModalPositions } from "./ManageModalPositions";
import { InitialValue } from "modules/positions/types";

type CreatePositionModalProps = {
  handleRequestCreatePositions: (name: string) => void;
};

const CreatePositionModal = memo(
  ({ handleRequestCreatePositions }: CreatePositionModalProps) => {
    const [isOpenCreateModal, setCreateModalVisibility] = useState(false);
    const { t } = useTranslation();

    const initialValue: InitialValue = {
      name: "",
    };

    const handlePositionCreateModalVisibility = () => {
      setCreateModalVisibility(visibility => !visibility);
    };

    const handleCreatePosition: FormSubmitHandler<InitialValue> = ({
      data,
    }) => {
      handleRequestCreatePositions(data.name);
      handlePositionCreateModalVisibility();
    };

    return (
      <>
        <ManageModalPositions
          initialValues={initialValue}
          isOpen={isOpenCreateModal}
          handleClose={handlePositionCreateModalVisibility}
          title={t("position.create")}
          buttonTitle={t("common.create")}
          handleSubmit={handleCreatePosition}
        />
        <Button
          roundBorders
          onClick={handlePositionCreateModalVisibility}
          variant="outlined"
          color="secondary"
        >
          <AddIcon />
          {t("position.create")}
        </Button>
      </>
    );
  },
);

CreatePositionModal.displayName = "CreatePositionModal";
export { CreatePositionModal };
