import React, { ReactNode } from "react";
import { Modal } from "shared/components/Modal";
import { Form } from "shared/components/Form";
import { Button } from "shared/components/Button";
import { P } from "shared/components/Typography";
import { FlexLayout } from "shared/components/FlexLayout";
import { FormButton } from "shared/components/FormButton";
import { useTranslation } from "react-i18next";
import { FormSubmitHandler } from "react-hook-form";
import { Box } from "shared/components/Box";

type FormModalProps<VALUE> = {
  isOpen: boolean;
  title: string;
  confirmButtonTitle: string;
  initialValues: VALUE;
  handleClose: () => void;
  handleSubmit: FormSubmitHandler<VALUE>;
  children?: ReactNode;
  modalSize?: "small" | "medium";
};

const FormModal = <VALUE,>({
  title,
  isOpen,
  initialValues,
  confirmButtonTitle,
  handleClose,
  handleSubmit,
  children,
  modalSize,
}: FormModalProps<VALUE>) => {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      title={title}
      size={modalSize}
    >
      <Form initialValues={initialValues} onSubmit={handleSubmit}>
        <Box paddingX={15} paddingButton={25}>
          {children}
        </Box>
        <FlexLayout direction="row" justifyContent="flex-end" spacing="buttons">
          <Button
            type="button"
            variant="outlined"
            color="inherit"
            onClick={handleClose}
          >
            <P size="small" upperCase>
              {t("formModal.cancel")}
            </P>
          </Button>
          <FormButton name={confirmButtonTitle} />
        </FlexLayout>
      </Form>
    </Modal>
  );
};

export { FormModal };
