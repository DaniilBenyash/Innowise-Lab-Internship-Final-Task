import React, { ReactNode } from "react";
import {
  Form as FormReactHookForm,
  FieldValues,
  FormProvider,
  useForm,
  FormSubmitHandler,
} from "react-hook-form";

type FormProps<T> = {
  initialValues: T;
  onSubmit: FormSubmitHandler<FieldValues>;
  children: ReactNode;
};

export const Form = <T,>({
  initialValues,
  onSubmit,
  children,
}: FormProps<T>) => {
  const methods = useForm<FieldValues>({
    defaultValues: initialValues,
    mode: "onBlur",
  });

  return (
    <FormProvider {...methods}>
      <FormReactHookForm control={methods.control} onSubmit={onSubmit}>
        {children}
      </FormReactHookForm>
    </FormProvider>
  );
};
