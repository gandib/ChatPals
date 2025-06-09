import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: string;
  required?: boolean;
};

const CPDatePicker = ({ name, label, required }: TDatePickerProps) => {
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
              { required: required, message: `Please choose your ${name}!` },
            ]}
          >
            <DatePicker {...field} size="large" style={{ width: "100%" }} />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CPDatePicker;
