import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../Button";
import { P } from "shared/components/Typography";
import { useTranslation } from "react-i18next";

type FormButtonProps = {
  name: string;
  fullWidth?: boolean;
};

const FormButton = ({ name, fullWidth }: FormButtonProps) => {
  const { t } = useTranslation();
  const {
    formState: { isValid },
  } = useFormContext();

  return (
    <Button
      fullWidth={fullWidth}
      type="submit"
      variant={isValid ? "contained" : "outlined"}
      disabled={!isValid}
      color={isValid ? "secondary" : "inherit"}
    >
      <P size="medium">{t(name)}</P>
    </Button>
  );
};

export { FormButton };
