import { Layout } from "antd";
const { Header, Content } = Layout;
import { Link, Outlet } from "react-router";
import { HomeOutlined } from "@ant-design/icons";

const DashboardLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* <Sidebar /> */}
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Link to="/">
              <span style={{ color: "white" }}>
                {" "}
                <HomeOutlined
                  style={{ fontSize: "20px", marginRight: "2px" }}
                />
                Home
              </span>
            </Link>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
