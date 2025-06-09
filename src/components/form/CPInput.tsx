import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  defaultValue?: string | number | readonly string[] | undefined;
  placeholder?: string;
};

const CPInput = ({
  type,
  name,
  label,
  disabled,
  required,
  defaultValue,
  placeholder,
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={label}
            name={name}
            required={required}
            rules={[
              { required: required, message: `Please input your ${name}!` },
            ]}
          >
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
              defaultValue={defaultValue}
              placeholder={placeholder}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CPInput;
