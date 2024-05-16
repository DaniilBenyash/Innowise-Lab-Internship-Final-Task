import React from "react";
import { FlexLayout } from "shared/components/FlexLayout";
import { Form } from "shared/components/Form";
import { H4, P } from "shared/components/Typography";
import { FormInputEmail } from "shared/components/FormInputEmail";
import { FormInputPassword } from "shared/components/FormInputPassword";
import { Button } from "shared/components/Button";
import { FormSubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Page } from "shared/components/Page";
import { Authentication } from "modules/auth/hooks/types";
import { useLogin } from "modules/auth/hooks/useLogin";

export const SignInPage = () => {
  const { t } = useTranslation();
  const initialValues: Authentication = {
    email: "",
    password: "",
  };

  const { handleUserRegister } = useLogin();

  const handleSubmit: FormSubmitHandler<Authentication> = ({ data }) =>
    handleUserRegister(data);

  return (
    <Page type="small" isCentered>
      <Form initialValues={initialValues} onSubmit={handleSubmit}>
        <H4 textAlign="center" marginBottom={3}>
          {t("signInPage.title")}
        </H4>
        <P textAlign="center" size="large" marginBottom={5}>
          {t("signInPage.welcome")}
        </P>
        <FlexLayout spacing="formFields">
          <FormInputEmail name="email" label={t("authPage.email")} fullWidth />
          <FormInputPassword
            name="password"
            label={t("authPage.password")}
            fullWidth
          />
          <Button type="submit" variant="contained" color="secondary" fullWidth>
            <P size="medium" upperCase fontWeight="bold">
              {t("signInPage.buttonName")}
            </P>
          </Button>
          <Button variant="text" color="secondary">
            <P size="medium" upperCase fontWeight="bold">
              {t("signInPage.haveAnAccount")}
            </P>
          </Button>
        </FlexLayout>
      </Form>
    </Page>
  );
};
