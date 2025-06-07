import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const ChatList = () => {
  return (
    <div className="flex gap-4 mb-4">
      <div className="w-[20%] ">
        <Avatar shape="square" size={64} icon={<UserOutlined />} />
      </div>
      <div className="w-[80%]  mr-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Jasmine Thompson
        </h2>
        <div className="flex gap-2 text-gray-500">
          <p>Had they visited Rome before</p>
          <p>~ 45 min</p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
