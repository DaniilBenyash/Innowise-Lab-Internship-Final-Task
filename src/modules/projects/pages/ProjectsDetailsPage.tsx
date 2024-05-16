import React, { useMemo } from "react";
import { useParams } from "react-router";
import {
  useGetProject,
  RequestedProject,
  useUpdateProject,
} from "modules/projects/hooks";
import { Page } from "shared/components/Page";
import { FlexLayout } from "shared/components/FlexLayout";
import { FormInput } from "shared/components/FormInput";
import { FormSelectInputDate } from "shared/components/FormInputDate";
import { useTranslation } from "react-i18next";
import { Form } from "shared/components/Form";
import { FormButton } from "shared/components/FormButton";
import { FormSubmitHandler } from "react-hook-form";
import { Loader } from "shared/components/Loader";
import { FormTextArea } from "shared/components/FormTextArea/FormTextArea";
import { useAuth } from "modules/common/utils";

type InitialValues = Omit<RequestedProject, "teamSize">;

const ProjectsDetailsPage = () => {
  const { id } = useParams();
  const { loading: loadingProject, project } = useGetProject(id);
  const { t } = useTranslation();

  const { handleUpdateProject, loading: loadingUpdateProject } =
    useUpdateProject();
  const { isAdmin } = useAuth();

  const initialValues: InitialValues = useMemo(() => {
    return {
      name: project?.name,
      internalName: project?.internalName,
      domain: project?.domain,
      startDate: project?.startDate,
      endDate: project?.endDate,
      description: project?.description,
    };
  }, [project]);

  const handleSubmitProjectUpdate: FormSubmitHandler<InitialValues> = ({
    data,
  }) => {
    handleUpdateProject(id, { ...data, teamSize: project.teamSize });
  };

  const loading = loadingProject || loadingUpdateProject;
  // ToDo implement admin logic connected with disabled inputs and hidden button https://trello.com/c/0uqaW8PV/100-projects-details-page-implement-admin-logic-connected-with-disabled-inputs-and-hidden-button

  return (
    <Page isCentered>
      {loading ? (
        <Loader />
      ) : (
        <Form
          initialValues={initialValues}
          onSubmit={handleSubmitProjectUpdate}
        >
          <FlexLayout spacing="sections" alginItems="stretch">
            <FlexLayout
              alginItems="flex-start"
              direction="row"
              spacing="sections"
            >
              <FormInput
                name="name"
                label={t("common.name")}
                required
                fullWidth
                disabled={!isAdmin}
              />
              <FormInput
                name="internalName"
                label={t("project.internal")}
                required
                fullWidth
                disabled={!isAdmin}
              />
            </FlexLayout>
            <FlexLayout
              alginItems="flex-start"
              direction="row"
              spacing="sections"
            >
              <FormSelectInputDate
                name="startDate"
                label={t("project.startDate")}
                required
                fullWidth
                dateFormat="YYYY-MM-DD"
                disabled={!isAdmin}
              />
              <FormInput
                name="domain"
                label={t("project.domain")}
                required
                fullWidth
                disabled={!isAdmin}
              />
              <FormSelectInputDate
                name="endDate"
                label={t("project.endDate")}
                required
                fullWidth
                dateFormat="YYYY-MM-DD"
                disabled={!isAdmin}
              />
            </FlexLayout>
            <FlexLayout>
              <FormTextArea
                name="description"
                label={t("common.description")}
                required
                disabled={!isAdmin}
                fullWidth
              />
            </FlexLayout>
            <FlexLayout
              alginItems="flex-start"
              direction="row"
              spacing="sections"
            >
              {isAdmin && <FormButton name={t("common.update")} fullWidth />}
            </FlexLayout>
          </FlexLayout>
        </Form>
      )}
    </Page>
  );
};

export { ProjectsDetailsPage };
