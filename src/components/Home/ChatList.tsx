import { Avatar } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setReceiverUser } from "../../redux/features/user/userSlice";
import type { TUserChat } from "../../types";
import moment from "moment";
import {
  getUserChat,
  setUserChat,
} from "../../redux/features/message/messageSlice";

const ChatList = ({ data }: { data: TUserChat }) => {
  const dispatch = useAppDispatch();

  const handlerUser = () => {
    dispatch(setReceiverUser(data));
    dispatch(setUserChat(data));
  };
  const mutualUser = useAppSelector(getUserChat);
  const connectedUser = mutualUser.filter((user) => user._id === data._id);

  let lastMessage: string | null = null;

  if (
    connectedUser.length > 0 &&
    Array.isArray(connectedUser[0].chats) &&
    connectedUser[0].chats.length > 0
  ) {
    lastMessage =
      connectedUser[0].chats[connectedUser[0].chats.length - 1]?.message ??
      null;
  } else if (Array.isArray(data?.chats) && data.chats.length > 0) {
    lastMessage = data.chats[data.chats.length - 1]?.message ?? null;
  }

  return (
    <div
      onClick={handlerUser}
      className="flex gap-4 mb-4 hover:bg-gray-200 cursor-pointer"
    >
      <div className="w-[15%] ">
        <Avatar shape="square" size={48} src={data?.image} />
      </div>
      <div className="w-[85%]  mr-4">
        <h2 className="text-base font-semibold text-gray-700">{data?.name}</h2>
        <div className="flex gap-2 justify-between text-xs text-gray-500">
          <p>
            {lastMessage ? (
              <>
                {lastMessage.slice(0, 30)}
                {lastMessage.length > 30 ? "..." : ""}
              </>
            ) : (
              <span className="text-gray-400 italic">No message</span>
            )}
          </p>
          <p>
            ~{" "}
            {moment(
              data &&
                data?.chats &&
                data?.chats[data?.chats?.length - 1]?.updatedAt
            ).toNow(true)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
