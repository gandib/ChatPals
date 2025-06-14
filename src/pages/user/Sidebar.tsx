import { Layout, Menu } from "antd";

const { Sider } = Layout;
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import type { IUser } from "../../types";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { userPaths } from "../../routes/user.routes";
import { adminPaths } from "../../routes/admin.routes";

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);

  let sidebarItems;

  switch ((user as IUser)?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", left: "0", top: "0" }}
    >
      <div
        style={{
          color: "white",
          textAlign: "center",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <img src={logo} style={{ width: "50%" }} /> */}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};
export default Sidebar;
