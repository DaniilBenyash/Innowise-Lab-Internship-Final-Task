import React, { ReactNode } from "react";
import ModalMUI from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Box as ModalBox } from "@mui/material";
import { IconButton } from "shared/components/IconButton";
import styles from "./modal.module.scss";
import { FlexLayout } from "shared/components/FlexLayout";
import { H6 } from "shared/components/Typography";
import { Box } from "shared/components/Box";
import classNames from "classnames";

type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
  title: string;
  size?: "small" | "medium";
};

const Modal = ({
  isOpen,
  handleClose,
  children,
  title,
  size = "small",
}: ModalProps) => {
  const boxSize = classNames(styles.modalBox, {
    [styles.small]: size === "small",
    [styles.medium]: size === "medium",
  });
  return (
    <ModalMUI
      className={styles.modal}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox className={boxSize}>
        <Box paddingTop={5} paddingX={15} paddingButton={20}>
          <FlexLayout
            alginItems="center"
            justifyContent="space-between"
            direction="row"
          >
            <H6 fontWeight="bold">{title}</H6>
            <IconButton onClick={handleClose} ariaLabel="modal-close">
              <CloseIcon />
            </IconButton>
          </FlexLayout>
        </Box>
        {children}
      </ModalBox>
    </ModalMUI>
  );
};

export { Modal };
