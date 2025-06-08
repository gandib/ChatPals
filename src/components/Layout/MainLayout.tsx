import { AppstoreTwoTone, MessageTwoTone } from "@ant-design/icons";
import { type MenuProps, Button, Layout, Menu } from "antd";
import { Link, Outlet } from "react-router";
const { Content } = Layout;

const MainLayout = () => {
  const user = { role: "user", email: "gandib@gmail.com" };
  const items1: MenuProps["items"] = [
    {
      key: "Home",
      label: (
        <Link to="/">
          <MessageTwoTone
            style={{ fontSize: "28px", marginRight: "2px", paddingTop: "16px" }}
          />
        </Link>
      ),
    },
    {
      key: "Dashboard",
      label: (
        <Link to={`${user?.role}/dashboard`}>
          <AppstoreTwoTone
            style={{ fontSize: "28px", marginRight: "2px", paddingTop: "16px" }}
          />
        </Link>
      ),
    },
  ];

  return (
    <div
      className="mx-0 top-0 right-0 left-0 fixed"
      style={{ minHeight: "90vh" }}
    >
      <div>
        <div className="flex bg-white p-1 items-center border border-t-0 border-x-0 border-b-gray-200">
          <div className="border-r-1 border-blue-300 pr-8 flex items-center px-4">
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
              border: 0,
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
        </div>
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
      </div>
    </div>
  );
};

export default MainLayout;
