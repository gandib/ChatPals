import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
  disabled?: boolean;
  mode?: "multiple" | undefined;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
  required?: boolean;
  defaultValue?: Record<string, unknown>;
};

const CPSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode,
  onValueChange,
  required,
  defaultValue,
}: TPHSelectProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue, onValueChange]);
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          name={name}
          required={required}
          rules={[
            { required: required, message: `Please select your ${name}!` },
          ]}
        >
          <Select
            mode={mode}
            style={{ width: "100%" }}
            {...field}
            options={options}
            disabled={disabled}
            defaultValue={defaultValue}
            size="large"
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CPSelectWithWatch;
