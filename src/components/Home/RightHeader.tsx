import { Avatar } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { getReceiverUser } from "../../redux/features/user/userSlice";
import { getUserChat } from "../../redux/features/message/messageSlice";

const RightHeader = () => {
  const mutualUser = useAppSelector(getUserChat);

  const userData = useAppSelector(getReceiverUser);
  return (
    <div>
      <div>
        <img
          src="https://connectme-html.themeyn.com/images/cover/1.jpg"
          alt=""
        />
      </div>
      <div className="flex justify-center mt-[-20px]">
        <Avatar
          shape="square"
          size={64}
          style={{ border: "2px solid white" }}
          src={userData?.image || mutualUser?.image}
        />
      </div>

      <div className="p-4">
        <h1 className="flex justify-center text-lg text-gray-600 font-semibold">
          {userData?.name || mutualUser?.name}
        </h1>
        <p className="flex justify-center text-xs text-gray-500 mt-1">
          Active Now
        </p>
      </div>
    </div>
  );
};

export default RightHeader;
