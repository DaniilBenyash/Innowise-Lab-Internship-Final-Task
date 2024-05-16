import React, { memo, useState } from "react";
import { Button } from "shared/components/Button";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { ManageModalEmployee } from "./ManageModalEmployee";
import { FormSubmitHandler } from "react-hook-form";
import { RequestedUser } from "modules/employees/types";

type CreateUserModalProps = {
  handleRequestCreateUser: (user: RequestedUser) => void;
};

const CreateEmployeeModal = memo(
  ({ handleRequestCreateUser }: CreateUserModalProps) => {
    const [isOpenCreateModal, setCreateModalVisibility] = useState(false);
    const { t } = useTranslation();

    const handleUserCreateModalVisibility = () => {
      setCreateModalVisibility(visibility => !visibility);
    };

    const handleUserCreate: FormSubmitHandler<RequestedUser> = ({ data }) => {
      handleRequestCreateUser(data);
      handleUserCreateModalVisibility();
    };
    return (
      <>
        <ManageModalEmployee
          handleSubmit={handleUserCreate}
          isOpen={isOpenCreateModal}
          handleClose={handleUserCreateModalVisibility}
          title={t("formModal.createUser")}
          buttonTitle={t("formModal.create")}
        />
        <Button
          onClick={handleUserCreateModalVisibility}
          variant="outlined"
          color="secondary"
          roundBorders
        >
          <AddIcon />
          {t("formModal.createUser")}
        </Button>
      </>
    );
  },
);

CreateEmployeeModal.displayName = "createEmployeeModal";
export { CreateEmployeeModal };
