import React from "react";
import { FormSubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { FlexLayout } from "shared/components/FlexLayout";
import { Form } from "shared/components/Form";
import { FormButton } from "shared/components/FormButton";
import { FormInputName } from "shared/components/FormInputName/FormInputName";
import { LoadingAvatar } from "shared/components/LoadingAvatar";
import { Page } from "shared/components/Page";
import { H5, P } from "shared/components/Typography";
import { useDeleteAvatar } from "modules/employees/hooks/avatar/useDeleteAvatar";
import { useGetUser, useUpdateUser } from "modules/employees/hooks";
import {
  Avatar,
  useUploadAvatar,
} from "modules/employees/hooks/avatar/useUploadAvatar";
import { Box } from "shared/components/Box";
import { UpdateUser } from "modules/employees/types";
import { FormPositionSelectInput } from "modules/common/components/FormPositionSelectInput";
import { FormDepartmentSelectInput } from "modules/common/components/FormDepartmentSelectInput";
import { Loader } from "shared/components/Loader";
import { useAuth } from "modules/common/utils";

type InitialValues = Omit<
  UpdateUser,
  "role" | "skills" | "languages" | "cvsId"
>;

const ProfilePage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { userId, idAdmin } = useAuth();

  const { user, loading: loadingUser } = useGetUser(id);
  const isOwner = userId === user?.id || idAdmin;

  const { handleUploadAvatar, loading: loadingUploadAvatar } =
    useUploadAvatar();
  const { handleDeleteAvatar, loading: loadingDeleteAvatar } =
    useDeleteAvatar();
  const { handleRequestUpdateUser, loading: loadingUpdateUser } =
    useUpdateUser();

  const loadingAvatar = loadingUploadAvatar || loadingDeleteAvatar;
  const loading = loadingUpdateUser || loadingUser;

  const handleAvatar = (avatar: Avatar) => {
    handleUploadAvatar(id, avatar);
  };

  const initialValues: InitialValues = {
    name: user?.profile?.firstName,
    surname: user?.profile?.lastName,
    department: user?.department?.id,
    position: user?.position?.id,
  };

  const handleUserUpdate: FormSubmitHandler<InitialValues> = ({ data }) => {
    handleRequestUpdateUser(user.id, {
      ...data,
      role: user.role,
      skills: user.profile?.skills,
      languages: user.profile?.languages,
      cvsId: user?.cvs?.map(cv => cv.id),
    });
  };

  const onRemoveAvatar = () => {
    handleDeleteAvatar(user.id);
  };
  if (loading) {
    return (
      <Page isCentered>
        <Loader />
      </Page>
    );
  }

  return (
    <Page isCenteredX>
      <Box paddingTop={60}>
        <FlexLayout alginItems="flex-start" spacing="sections">
          {loadingAvatar ? (
            <Loader />
          ) : (
            <LoadingAvatar
              isOwner={isOwner}
              onUploadAvatar={handleAvatar}
              profile={user?.profile}
              onRemoveAvatar={onRemoveAvatar}
            />
          )}
          <FlexLayout alginItems="flex-start">
            <H5 fontWeight="regular">{user?.profile.fullName}</H5>
            <P size="large">{user?.email}</P>
            <P size="large">{`${t("user.member")} ${user?.createdAt}`}</P>
          </FlexLayout>
          <Form onSubmit={handleUserUpdate} initialValues={initialValues}>
            <FlexLayout
              spacing="formFields"
              alginItems="flex-start"
              direction="row"
            >
              <FlexLayout spacing="sections">
                <FormInputName
                  name="name"
                  label={t("input.name")}
                  required
                  disabled={!isOwner}
                />
                <FormDepartmentSelectInput
                  name="department"
                  required
                  disabled={!isOwner}
                />
              </FlexLayout>
              <FlexLayout spacing="sections">
                <FormInputName
                  name="surname"
                  label={t("input.surname")}
                  required
                  disabled={!isOwner}
                />
                <FormPositionSelectInput
                  name="position"
                  required
                  disabled={!isOwner}
                />
                {isOwner && (
                  <FormButton name={t("formModal.update")} fullWidth />
                )}
              </FlexLayout>
            </FlexLayout>
          </Form>
        </FlexLayout>
      </Box>
    </Page>
  );
};

export { ProfilePage };
