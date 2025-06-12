import { Avatar } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { getReceiverUser } from "../../redux/features/user/userSlice";
import { getUserChat } from "../../redux/features/message/messageSlice";

const ContentHeader = () => {
  const userData = useAppSelector(getReceiverUser);
  const mutualUser = useAppSelector(getUserChat);

  return (
    <div className="flex gap-2 justify-start p-6 bg-white border-x border-x-gray-200 border-t border-t-gray-200">
      <div className="w-[8%] ">
        <Avatar
          shape="square"
          src={userData?.image || mutualUser[0]?.image}
          size={48}
        />
      </div>
      <div className="w-[90%]  mr-4">
        <h2 className="text-lg font-semibold text-gray-700">
          {userData?.name || mutualUser[0]?.name}
        </h2>
        <div className="text-xs text-gray-500">
          <p>Active</p>
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
