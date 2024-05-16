import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "shared/components/Button";
import { FlexLayout } from "shared/components/FlexLayout";
import { Modal } from "shared/components/Modal";
import { P } from "shared/components/Typography";
import { Box } from "shared/components/Box";

type ConfirmationModalProps = {
  isOpen: boolean;
  description: string;
  confirmationText: string;
  title: string;
  handleClose: () => void;
  handleRequest: () => void;
};

const ConfirmationModal = ({
  isOpen,
  handleClose,
  title,
  description,
  confirmationText,
  handleRequest,
}: ConfirmationModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title={title}>
      <Box paddingX={15} paddingButton={20}>
        <FlexLayout
          direction="row"
          spacing="buttons"
          justifyContent="flex-start"
        >
          <P size="medium">{description}</P>
          <P size="medium" fontWeight="bold">
            {confirmationText}
          </P>
        </FlexLayout>
      </Box>
      <FlexLayout direction="row" justifyContent="flex-end" spacing="buttons">
        <Button variant="outlined" color="inherit" onClick={handleClose}>
          {t("formModal.cancel")}
        </Button>
        <Button variant="contained" color="secondary" onClick={handleRequest}>
          {t("user.confirm")}
        </Button>
      </FlexLayout>
    </Modal>
  );
};

export { ConfirmationModal };
