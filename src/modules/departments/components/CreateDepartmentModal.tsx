import React, { memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "shared/components/Button";
import { ManageModalDepartment } from "../components";
import { FormSubmitHandler } from "react-hook-form";
import { RequestedDepartment } from "../hooks/types";
import AddIcon from "@mui/icons-material/Add";

type CreateDepartmentModalProps = {
  handleRequestDepartmentCreate: (name: string) => void;
};

const CreateDepartmentModal = memo(
  ({ handleRequestDepartmentCreate }: CreateDepartmentModalProps) => {
    const { t } = useTranslation();
    const [isOpenCreateModal, setCreateModalVisibility] = useState(false);

    const handleDepartmentCreateModalVisibility = () => {
      setCreateModalVisibility(visibility => !visibility);
    };

    const initialValue = useMemo(() => {
      return {
        name: "",
      };
    }, []);

    const handleDepartmentCreate: FormSubmitHandler<RequestedDepartment> = ({
      data,
    }) => {
      handleRequestDepartmentCreate(data.name);
    };

    return (
      <>
        <ManageModalDepartment
          initialValue={initialValue}
          isOpen={isOpenCreateModal}
          handleSubmit={handleDepartmentCreate}
          handleClose={handleDepartmentCreateModalVisibility}
          variant="create"
        />
        <Button
          variant="outlined"
          color="secondary"
          roundBorders
          onClick={handleDepartmentCreateModalVisibility}
        >
          <AddIcon />
          {t("departmentsPage.createDepartment")}
        </Button>
      </>
    );
  },
);

CreateDepartmentModal.displayName = "createDepartmentModal";
export { CreateDepartmentModal };
