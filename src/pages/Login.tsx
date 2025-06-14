/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex, Row } from "antd";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import CPForm from "../components/form/CPForm";
import CPInput from "../components/form/CPInput";
import { useAppDispatch } from "../redux/hooks";
import authApi from "../redux/features/auth/authApi";
import type { IUser } from "../types";
import { verifyToken } from "../utils/verifyToken";
import { setUser } from "../redux/features/auth/authSlice";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = authApi.useLoginMutation();
  const [handleForgetPassword] = authApi.useForgetPasswordMutation();
  const [error, setError] = useState("");

  let formMethods: UseFormReturn<FieldValues>;

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in.");
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.token) as IUser;

      dispatch(setUser({ user, token: res.token }));
      toast.success("Logged in successfully!", { id: toastId });

      navigate(`/`);
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId });
    }
  };

  const recoverPassword = async (email: string) => {
    const data = { email };
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      setError("Please enter a valid email!");
    } else {
      setError("");

      const toastId = toast.loading("Forget password link generating...");
      try {
        const res = await handleForgetPassword(data).unwrap();
        toast.success(res.message, { id: toastId });
      } catch (error: any) {
        toast.error(error?.data?.message, { id: toastId });
      }
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={20}>
        <h1 className="mb-4 flex justify-center text-2xl font-bold">Login</h1>

        <div className="flex p-2 justify-center">
          <p className="font-bold flex items-center text-lg">Credentials:</p>
          <Button
            onClick={() => {
              formMethods?.setValue("email", "jasmine@gmail.com");
              formMethods?.setValue("password", "123456");
            }}
            size="middle"
            className="mx-2 bg-primary-500 text-white "
          >
            User A
          </Button>
          <Button
            onClick={() => {
              formMethods?.setValue("email", "marie@gmail.com");
              formMethods?.setValue("password", "123456");
            }}
            size="middle"
            className="mr-2 bg-secondary-500 text-white"
          >
            User B
          </Button>
        </div>

        <CPForm
          onSubmit={onSubmit}
          methodsRef={(methods) => {
            formMethods = methods;
          }}
        >
          <Flex vertical>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <CPInput
                  type="text"
                  name="email"
                  label="Email:"
                  required={true}
                />
              </Col>
            </Col>

            <Col
              span={24}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <CPInput
                  type="password"
                  name="password"
                  label="Password:"
                  required={true}
                />
              </Col>
            </Col>
            {/* </Row> */}
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <span className="text-sm text-rose-600">{error}</span>

                <div className="py-3">
                  <p
                    className="cursor-pointer hover:text-green-500"
                    onClick={() => recoverPassword(formMethods.watch("email"))}
                  >
                    Forgot Password?
                  </p>
                </div>

                <h4 style={{ marginBottom: "15px" }}>
                  New to ChatPals?{" "}
                  <span style={{ color: "green" }}>
                    <Link to="/register">Register</Link>
                  </span>
                </h4>
              </Col>
            </Col>

            <Col
              span={24}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <Button
                  style={{
                    backgroundColor: "slategray",
                    color: "white",
                    fontWeight: "bold",
                    width: "100%",
                  }}
                  htmlType="submit"
                >
                  Login
                </Button>
              </Col>
            </Col>
          </Flex>
        </CPForm>
      </Col>
    </Row>
  );
};

export default Login;
