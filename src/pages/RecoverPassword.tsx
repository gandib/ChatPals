/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import CPForm from "../components/form/CPForm";
import CPInput from "../components/form/CPInput";
import { Button, Col, Flex, Row } from "antd";
import authApi from "../redux/features/auth/authApi";
import { toast } from "sonner";

const RecoverPassword = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [handleRecoverPassword] = authApi.useRecoverPasswordMutation();

  const onSubmit = async (data: FieldValues) => {
    const recoverData = {
      token,
      data: {
        id,
        newPassword: data.newPassword,
      },
    };

    const toastId = toast.loading("Password recovering...");
    try {
      const res = await handleRecoverPassword(recoverData).unwrap();
      toast.success(res.message, { id: toastId });

      navigate(`/login`);
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={20}>
        <h3 className="mb-4 flex justify-center text-2xl font-bold">
          Recover Password
        </h3>
        <CPForm onSubmit={onSubmit}>
          <Flex vertical>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <CPInput name="newPassword" type="password" label="Password" />
              </Col>
            </Col>

            <Col
              span={24}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <Button
                  className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
                  size="large"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Col>
            </Col>
          </Flex>
        </CPForm>
      </Col>
    </Row>
  );
};

export default RecoverPassword;
