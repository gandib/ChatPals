/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { type ReactNode, useEffect } from "react";
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
  type UseFormReturn,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, unknown>;
  resolver?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  methodsRef?: (methods: UseFormReturn<FieldValues>) => void;
} & TFormConfig;

const CPForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
  methodsRef,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  useEffect(() => {
    if (methodsRef) {
      methodsRef(methods);
    }
  }, [methods, methodsRef]);

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default CPForm;
