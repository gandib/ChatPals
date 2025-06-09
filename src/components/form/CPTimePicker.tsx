import { Form, TimePicker } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TTimePickerProps = {
  name: string;
  label?: string;
  required?: boolean;
};

const CPTimePicker = ({ name, label, required }: TTimePickerProps) => {
  const { control } = useFormContext();
  return (
    <div style={{ marginBottom: "10px" }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Form.Item
              label={label}
              name={name}
              required={required}
              rules={[
                { required: required, message: `Please choose your ${name}!` },
              ]}
            >
              <TimePicker
                {...field}
                size="large"
                style={{ width: "100%" }}
                format="HH:mm"
              />
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </Form.Item>
          </>
        )}
      />
    </div>
  );
};

export default CPTimePicker;
