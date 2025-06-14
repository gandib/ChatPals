import { Button, Col, Row } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let error = "";
  console.log(location);
  if (
    location?.state?.split("/")[1] === "admin" ||
    location?.state?.split("/")[1] === "user"
  ) {
    error = "Unauthorized access!";
  }

  useEffect(() => {
    const checkPath = async () => {
      if (location?.pathname?.split("/")[1] === "undefined") {
        navigate("/login");
      }
    };

    checkPath();
  }, [location?.pathname, navigate]);

  return (
    <>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <h1 className="text-red-500 text-xl">
          {error ? error : "Oppps! Not Found!"}
        </h1>
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <Col span={4} style={{ marginRight: "10px" }}>
            <Button
              onClick={() => navigate("/")}
              style={{
                width: "100%",
                backgroundColor: "slateblue",
                color: "white",
                height: "40px",
                fontWeight: "bold",
              }}
            >
              Home
            </Button>
          </Col>
          <Col span={4}>
            <Button
              onClick={() => navigate("/login")}
              style={{
                width: "100%",
                backgroundColor: "slategrey",
                color: "white",
                height: "40px",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          </Col>
        </Col>
      </Row>
    </>
  );
};

export default ErrorPage;
