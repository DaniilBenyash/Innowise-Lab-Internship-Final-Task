import React, { useState } from "react";
import { FormInput, FormInputProps } from "shared/components/FormInput";
import { IconButton } from "shared/components/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTranslation } from "react-i18next";

type FormInputPasswordProps = Omit<FormInputProps, "validate" | "type"> & {
  hasIcon?: boolean;
};

export const FormInputPassword = ({
  hasIcon = true,
  ...props
}: FormInputPasswordProps) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const validate = (password: string) => {
    if (!/.*?(?:[a-z].*?[0-9]|[0-9].*?[a-z]).*?/.test(password)) {
      return t("errors.passwordInputOneLetter");
    }

    return true;
  };
  return (
    <FormInput
      type={showPassword ? "text" : "password"}
      validate={validate}
      fullWidth={props.fullWidth}
      required
      minLength={6}
      endAdornmentPlacement="end"
      endAdornment={
        hasIcon && (
          <IconButton
            ariaLabel="toggle password visibility"
            onClick={handleClickShowPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        )
      }
      {...props}
    />
  );
};
