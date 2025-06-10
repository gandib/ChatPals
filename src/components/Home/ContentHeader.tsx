import { Avatar } from "antd";
import { useGetUserById } from "../../hooks/user.hooks";

const ContentHeader = ({ receiverId }: { receiverId: string }) => {
  console.log({ receiverId });
  const { data: userData } = useGetUserById(receiverId);
  console.log(userData);
  return (
    <div className="flex gap-2 justify-start p-6 bg-white border-x border-x-gray-200 border-t border-t-gray-200">
      <div className="w-[8%] ">
        <Avatar
          shape="square"
          src="https://connectme-html.themeyn.com/images/avatar/1.jpg"
          size={48}
        />
      </div>
      <div className="w-[90%]  mr-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Konstantin Frank
        </h2>
        <div className="text-xs text-gray-500">
          <p>Active</p>
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
