import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
};

const CPInput = ({
  type,
  name,
  label,
  disabled,
  required,
  placeholder,
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        rules={{
          required: required ? `Please input your ${name}` : false,
        }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label} validateStatus={error ? "error" : ""}>
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
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
