import React from "react";
import { FormSubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormInput } from "shared/components/FormInput";
import { FormModal } from "shared/components/FormModal";

type ManageModalPositionsProps<VALUE> = {
  isOpen: boolean;
  handleClose: () => void;
  initialValues: VALUE;
  handleSubmit: FormSubmitHandler<VALUE>;
  buttonTitle: string;
  title: string;
  namePosition?: string;
};

const ManageModalPositions = <VALUE,>({
  isOpen,
  handleClose,
  initialValues,
  handleSubmit,
  title,
  buttonTitle,
}: ManageModalPositionsProps<VALUE>) => {
  const { t } = useTranslation();

  return (
    <FormModal
      title={title}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      confirmButtonTitle={buttonTitle}
      handleClose={handleClose}
      initialValues={initialValues}
    >
      <FormInput
        name="name"
        label={t("common.name")}
        fullWidth
        required
        minLength={5}
      />
    </FormModal>
  );
};

export { ManageModalPositions };
