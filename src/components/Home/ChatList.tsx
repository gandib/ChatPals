import { Avatar } from "antd";
import { useAppDispatch } from "../../redux/hooks";
import { setReceiverUser } from "../../redux/features/user/userSlice";

const ChatList = ({
  data,
}: {
  data: {
    _id: string;
    name: string;
    image: string;
    message: string;
    time: string;
  };
}) => {
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => dispatch(setReceiverUser(data))}
      className="flex gap-4 mb-4 hover:bg-gray-200 cursor-pointer"
    >
      <div className="w-[15%] ">
        <Avatar shape="square" size={48} src={data?.image} />
      </div>
      <div className="w-[85%]  mr-4">
        <h2 className="text-base font-semibold text-gray-700">{data?.name}</h2>
        <div className="flex gap-2 text-xs text-gray-500">
          <p>{data?.message}</p>
          <p>~ {data?.time}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
