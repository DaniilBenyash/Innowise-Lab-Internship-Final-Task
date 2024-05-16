import React from "react";
import { FormSubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FlexLayout } from "shared/components/FlexLayout";
import { FormInputName } from "shared/components/FormInputName/FormInputName";
import { FormModal } from "shared/components/FormModal";

type ManageModalLanguageProps<VALUE> = {
  isOpen: boolean;
  handleClose: () => void;
  initialValues?: VALUE;
  handleSubmit: FormSubmitHandler<VALUE>;
  title: string;
  buttonTitle: string;
};

const ManageModalLanguage = <VALUE,>({
  isOpen,
  handleClose,
  initialValues,
  handleSubmit,
  title,
  buttonTitle,
}: ManageModalLanguageProps<VALUE>) => {
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
      <FlexLayout alginItems="flex-start" spacing="formFields">
        <FormInputName
          name="name"
          label={t("formModal.name")}
          required
          fullWidth
        />
        <FormInputName
          name="nativeName"
          label={t("language.nativeName")}
          required
          fullWidth
        />
        <FormInputName name="iso2" label="ISO2" required fullWidth />
      </FlexLayout>
    </FormModal>
  );
};

export { ManageModalLanguage };
