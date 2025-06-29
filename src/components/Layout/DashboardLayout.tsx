import { Button, Layout } from "antd";
const { Header, Content } = Layout;
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { baseApi } from "../../redux/api/baseApi";
import { HomeOutlined } from "@ant-design/icons";
import Sidebar from "../../pages/user/Sidebar";

const DashboardLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
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
              <span className="text-white hover:text-blue-400 flex items-center text-[16px] transition-colors duration-300">
                <HomeOutlined className="text-[20px] mr-1" />
                Home
              </span>
            </Link>
          </div>

          <Button onClick={handleLogout}>Logout</Button>
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
