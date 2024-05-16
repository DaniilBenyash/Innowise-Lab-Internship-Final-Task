import React, { memo, useState } from "react";
import { ManageModalLanguage } from "./ManageModalLanguage";
import { Button } from "shared/components/Button";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { FormSubmitHandler } from "react-hook-form";
import { InitialValues } from "modules/languages/types";

type CreateLanguageModalProps = {
  handleRequestCreateLanguage: (language: InitialValues) => void;
};

const CreateLanguageModal = memo(
  ({ handleRequestCreateLanguage }: CreateLanguageModalProps) => {
    const { t } = useTranslation();
    const [isOpenCreateModal, setCreateModalVisibility] = useState(false);

    const handleLanguageCreateModalVisibility = () => {
      setCreateModalVisibility(visibility => !visibility);
    };

    const handleCreateLanguage: FormSubmitHandler<InitialValues> = ({
      data,
    }) => {
      handleRequestCreateLanguage(data);
      handleLanguageCreateModalVisibility();
    };

    return (
      <>
        <ManageModalLanguage
          isOpen={isOpenCreateModal}
          handleClose={handleLanguageCreateModalVisibility}
          title={t("language.create")}
          buttonTitle={t("common.create")}
          handleSubmit={handleCreateLanguage}
        />
        <Button
          roundBorders
          onClick={handleLanguageCreateModalVisibility}
          variant="outlined"
          color="secondary"
        >
          <AddIcon />
          {t("language.create")}
        </Button>
      </>
    );
  },
);
CreateLanguageModal.displayName = "createLanguageModal";
export { CreateLanguageModal };
