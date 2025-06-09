import { PictureOutlined, SendOutlined } from "@ant-design/icons";
import { Input } from "antd";

const ContentFooter = ({
  setText,
  text,
  sendMessage,
}: {
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  sendMessage: () => void;
}) => {
  console.log(text);
  return (
    <div className="flex items-center h-[10vh] border border-t-0 border-x-gray-200 border-y-0">
      <div className="w-[15%] flex justify-end mr-4 ">
        {/* Image upload button  */}
        <div className="rounded-full p-2 px-3 bg-gray-300 cursor-pointer">
          <PictureOutlined />
        </div>
      </div>

      <div className="w-[70%]">
        <Input
          size="large"
          className="bg-gray-500"
          style={{ backgroundColor: "#e2e8f0" }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="w-[15%] ml-4">
        <SendOutlined
          onClick={() => sendMessage()}
          size={48}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ContentFooter;
