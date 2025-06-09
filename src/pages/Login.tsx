/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd";
import type { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import CPForm from "../components/form/CPForm";
import CPInput from "../components/form/CPInput";
import { useUserlogin } from "../hooks/auth.hooks";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  //   const { register } = useForm();

  const { mutate: login, isPending, isSuccess } = useUserlogin();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging...");

    try {
      login(data);

      toast.success("Logged in successfully!", { id: toastId, duration: 2000 });
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId, duration: 2000 });
    }
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      navigate("/");
    }
  }, [isPending, isSuccess, navigate]);

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <div>
        <h1
          style={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Login
        </h1>
        <CPForm onSubmit={onSubmit}>
          <CPInput type="text" name="email" label="Email:" required={true} />
          <CPInput
            type="password"
            name="password"
            label="Password:"
            required={true}
          />
          <h4 style={{ marginBottom: "15px" }}>
            New to Sports Smart Booking? Go to{" "}
            <span style={{ color: "green", cursor: "pointer" }}>
              <Link to="/register">Register</Link>
            </span>
          </h4>
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
        </CPForm>
      </div>
    </Row>
  );
};

export default Login;
