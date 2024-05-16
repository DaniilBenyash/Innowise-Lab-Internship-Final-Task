import React from "react";
import { FormSubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FlexLayout } from "shared/components/FlexLayout";
import { FormInput } from "shared/components/FormInput";
import { FormSelectInputDate } from "shared/components/FormInputDate";
import { FormModal } from "shared/components/FormModal";
import { FormTextArea } from "shared/components/FormTextArea/FormTextArea";

type ManageModalPositionsProps<VALUE> = {
  isOpen: boolean;
  handleClose: () => void;
  initialValues?: VALUE;
  handleSubmit?: FormSubmitHandler<VALUE>;
  buttonTitle: string;
  title: string;
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
      modalSize="medium"
    >
      <FlexLayout alginItems="stretch" spacing="sections">
        <FlexLayout alginItems="flex-start" direction="row" spacing="sections">
          <FormInput name="name" label={t("common.name")} required fullWidth />
          <FormInput
            name="internalName"
            label={t("project.internal")}
            required
            fullWidth
          />
        </FlexLayout>
        <FlexLayout alginItems="flex-start" direction="row" spacing="sections">
          <FormInput
            name="domain"
            label={t("project.domain")}
            required
            fullWidth
          />
          <FormInput
            type="number"
            required
            name="teamSize"
            fullWidth
            label={t("project.teamSize")}
          />
        </FlexLayout>
        <FlexLayout alginItems="flex-start" direction="row" spacing="sections">
          <FormSelectInputDate
            name="startDate"
            label={t("project.startDate")}
            required
            fullWidth
            dateFormat="YYYY-MM-DD"
          />
          <FormSelectInputDate
            name="endDate"
            label={t("project.endDate")}
            required
            fullWidth
            dateFormat="YYYY-MM-DD"
          />
        </FlexLayout>
        <FormTextArea
          fullWidth
          name="description"
          required
          label={t("common.description")}
        />
      </FlexLayout>
    </FormModal>
  );
};

export { ManageModalPositions };
