/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex, Row } from "antd";
import { type FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import CPForm from "../components/form/CPForm";
import CPInput from "../components/form/CPInput";
import { useUserRegistration } from "../hooks/auth.hooks";
import { useEffect, useState, type ChangeEvent } from "react";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const {
    mutate: handleUserRagistration,
    isPending,
    isSuccess,
  } = useUserRegistration();

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();
    const userData = {
      ...data,
      image: " ",
    };

    console.log(data);

    formData.append("data", JSON.stringify(userData));

    formData.append("file", imageFiles[0]);

    handleUserRagistration(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles([file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews([reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  if (isPending) {
    //handle loading state
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("User registration successful!");
    }

    if (!isPending && isSuccess) {
      toast("User registration success!");
      navigate("/");
    }
  }, [isPending, isSuccess, navigate]);
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={20}>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Register
        </h1>
        <CPForm onSubmit={onSubmit}>
          <Flex vertical>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <CPInput
                  type="text"
                  name="name"
                  label="Name:"
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

            <Col
              span={24}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <div className="min-w-fit flex-1 h-12">
                  <label
                    className="bg-white border-1 border-gray-300 p-3 w-full h-full rounded-md flex items-center font-light"
                    htmlFor="image"
                  >
                    Upload image
                  </label>
                  <input
                    className="hidden"
                    id="image"
                    type="file"
                    onChange={(e) => handleImageChange(e)}
                  />
                </div>
              </Col>
            </Col>
            {imagePreviews.length > 0 && (
              <Col
                span={24}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                  <div className="flex flex-wrap gap-5 my-5">
                    <div className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2">
                      <img
                        src={imagePreviews[0] as string}
                        //   alt="item"
                        className="h-full w-full object-cover object-center rounded-md"
                      />
                    </div>
                  </div>
                </Col>
              </Col>
            )}
            <Col
              span={24}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "28px",
              }}
            >
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <h4 style={{ marginBottom: "15px" }}>
                  Already have an account? Go to{" "}
                  <span style={{ color: "green", cursor: "pointer" }}>
                    <Link to="/login">Login</Link>
                  </span>
                </h4>
              </Col>
            </Col>
            <Col
              span={24}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "40px",
              }}
            >
              <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "slategray",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  htmlType="submit"
                >
                  Sign Up
                </Button>
              </Col>
            </Col>
          </Flex>
        </CPForm>
      </Col>
    </Row>
  );
};

export default Register;
