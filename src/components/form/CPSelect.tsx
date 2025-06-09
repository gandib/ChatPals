import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
  disabled?: boolean;
  mode?: "multiple" | undefined;
  required?: boolean;
  defaultValue?: Record<string, unknown>;
};

const CPSelect = ({
  label,
  name,
  options,
  disabled,
  mode,
  required,
  defaultValue,
}: TPHSelectProps) => {
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

export default CPSelect;
