import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getUserChat,
  updateReadBy,
} from "../../redux/features/message/messageSlice";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import moment from "moment";
import { getReceiverUser } from "../../redux/features/user/userSlice";

const ContentBody = ({
  imageFile,
  setImageFile,
}: {
  imageFile: File | undefined;
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}) => {
  const chatData = useAppSelector(getUserChat);
  const currentUser = useAppSelector(selectCurrentUser);
  const receiver = useAppSelector(getReceiverUser);
  const dispatch = useAppDispatch();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Scroll whenever chatData changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [receiver, chatData]);

  const isNewDate = (currDate: string, prevDate: string | null) => {
    return !prevDate || !moment(currDate).isSame(prevDate, "day");
  };

  let lastDate: string | null = null;

  const filteredChatData = receiver
    ? chatData?.filter((user) => user._id === receiver._id)[0]
    : chatData[0];

  return (
    <div
      onMouseLeave={() => {
        dispatch(
          updateReadBy({
            senderId: (receiver?._id as string)
              ? (receiver?._id as string)
              : chatData[0]?.chats[chatData[0]?.chats?.length - 1].sender?._id,
            receiverId: currentUser?._id as string,
          })
        );
      }}
      className="bg-blue-100 h-[67vh] p-4 overflow-y-auto space-y-3"
    >
      {filteredChatData?.chats
        ?.filter((chat): chat is typeof chat => !!chat)
        .map((chat) => {
          const isSender = chat.sender?._id === currentUser?._id;
          const messageDate = chat.createdAt as unknown as string;
          const shouldShowDate = isNewDate(messageDate, lastDate);
          lastDate = messageDate;

          return (
            <div key={chat._id}>
              {/* Date Divider */}
              {shouldShowDate && (
                <div className="flex justify-center">
                  <span className="bg-gray-300 text-gray-700 text-sm px-4 py-1 rounded-full">
                    {moment(messageDate).calendar(null, {
                      sameDay: "[Today]",
                      lastDay: "[Yesterday]",
                      lastWeek: "dddd",
                      sameElse: "MMM D, YYYY",
                    })}
                  </span>
                </div>
              )}
              {/* Message Bubble */}
              <div
                className={`flex ${
                  isSender ? "justify-end" : "justify-start"
                } px-3`}
              >
                <div
                  className={`relative mb-3 max-w-[70%] px-4 py-2 text-white ${
                    isSender
                      ? "bg-blue-600 rounded-tl-lg rounded-bl-lg rounded-br-lg"
                      : "bg-gray-600 rounded-tr-lg rounded-br-lg rounded-bl-lg"
                  }`}
                >
                  {/* Tail */}
                  <div
                    className={`absolute top-0 ${
                      isSender ? "right-0" : "left-0"
                    } w-4 h-4 bg-blue-600 z-10 ${
                      isSender
                        ? "translate-x-2 -translate-y-2 rotate-45"
                        : "-translate-x-2 -translate-y-2 rotate-45 bg-gray-600"
                    }`}
                    style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                  ></div>

                  <div className="flex flex-col gap-2">
                    {chat.image && (
                      <img
                        src={chat.image}
                        alt="sent-media"
                        className="rounded-md max-w-[200px] max-h-[200px] object-cover"
                      />
                    )}

                    <div className="flex justify-between items-end gap-2">
                      {chat.message && (
                        <p className="break-words">{chat.message}</p>
                      )}

                      <p className="text-[10px] text-gray-300 min-w-[40px] text-right">
                        {moment(chat.createdAt).format("h:mm A")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      <div ref={bottomRef} />

      {imageFile && (
        <div className="flex justify-start px-4 py-2">
          <div className="relative w-32 h-32">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="preview"
              className="rounded-lg shadow-md object-cover w-full h-full"
            />
            <button
              className="absolute top-1 right-1 bg-white rounded-full p-1 text-xs shadow-md"
              onClick={() => setImageFile(undefined)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentBody;
