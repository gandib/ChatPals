/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import CPForm from "../../components/form/CPForm";
import CPInput from "../../components/form/CPInput";
import userApi from "../../redux/features/user/userApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import type { FieldValues } from "react-hook-form";

const ChangePassword = () => {
  const [handleChangePassword] = userApi.useUpdateUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const userCredentials = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(userCredentials));

    const toastId = toast.loading("Password changing...");
    try {
      const res = await handleChangePassword(formData).unwrap();
      toast.success(res.message, { id: toastId });

      navigate(`/login`);
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId });
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center ">
      <h3 className="my-2 text-2xl font-bold">Change Password</h3>
      <div className="w-full md:w-[80%]">
        <CPForm
          onSubmit={onSubmit}
          // resolver={zodResolver(userValidationSchema)}
        >
          <div className="py-3">
            <CPInput name="oldPassword" label="Old Password" type="password" />
          </div>
          <div className="py-3">
            <CPInput name="newPassword" label="New Password" type="password" />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="large"
            htmlType="submit"
          >
            Update
          </Button>
        </CPForm>
      </div>
    </div>
  );
};

export default ChangePassword;
