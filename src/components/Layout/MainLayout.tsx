import { AppstoreTwoTone, MessageTwoTone } from "@ant-design/icons";
import { type MenuProps, Button, Layout, Menu } from "antd";
import { Link, Outlet } from "react-router";
const { Header, Content } = Layout;

const MainLayout = () => {
  const user = { role: "user", email: "gandib@gmail.com" };
  const items1: MenuProps["items"] = [
    {
      key: "Home",
      label: (
        <Link to="/">
          <MessageTwoTone
            style={{ fontSize: "28px", marginRight: "2px", paddingTop: "20px" }}
          />
        </Link>
      ),
    },
    {
      key: "Dashboard",
      label: (
        <Link to={`${user?.role}/dashboard`}>
          <AppstoreTwoTone
            style={{ fontSize: "28px", marginRight: "2px", paddingTop: "20px" }}
          />
        </Link>
      ),
    },
  ];

  return (
    <Layout className="mx-0" style={{ minHeight: "90vh", position: "fixed" }}>
      <Layout>
        <Header
          style={{
            display: "flex",
            backgroundColor: "white",
            padding: "16px",
            alignItems: "center",
          }}
        >
          <div className="border-r-1 border-blue-300 pr-8 flex items-center">
            <h1 className="text-xl font-bold cursor-pointer text-blue-500">
              ChatPals
            </h1>
            {/* <img
              src={logo}
              style={{
                width: "50%",
                height: "70%",
              }}
            /> */}
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["4"]}
            items={items1}
            style={{
              flex: 1,
              minWidth: 0,
              fontSize: "18px",
              marginLeft: "20px",
            }}
          />
          <div>
            {user && user.email ? (
              <Button
                // onClick={handleLogout}
                style={{ fontWeight: "bold", fontSize: "18px" }}
              >
                Logout
              </Button>
            ) : (
              <Button style={{ fontWeight: "bold", fontSize: "18px" }}>
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>
        </Header>
        <Content style={{ margin: "0px 16px 0" }}>
          <div
          // style={{
          //   padding: 24,
          //   minHeight: 360,
          // }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
