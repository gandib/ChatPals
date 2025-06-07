import { Input } from "antd";
import ChatList from "./ChatList";

const LeftSidebar = () => {
  return (
    <div className="flex flex-col h-screen  border-r">
      {/* Header */}
      <h1 className="text-2xl text-gray-600 font-bold p-4">Chats</h1>

      {/* Search input */}
      <div className="px-4 pb-4">
        <Input size="large" placeholder="Search contact / chat" />
      </div>

      {/* Scrollable ChatList */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
      </div>
    </div>
  );
};

export default LeftSidebar;
