import { useEffect, useRef } from "react";
import { useAppSelector } from "../../redux/hooks";
import { getUserChat } from "../../redux/features/message/messageSlice";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import moment from "moment";

const ContentBody = () => {
  const chatData = useAppSelector(getUserChat);
  const currentUser = useAppSelector(selectCurrentUser);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Scroll whenever chatData changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatData]);

  const isNewDate = (currDate: string, prevDate: string | null) => {
    return !prevDate || !moment(currDate).isSame(prevDate, "day");
  };

  let lastDate: string | null = null;

  return (
    <div className="bg-blue-100 h-[67vh] p-4 overflow-y-auto space-y-3">
      {chatData?.chats
        ?.filter((chat): chat is typeof chat => !!chat)
        .map((chat) => {
          const isSender = chat.sender?._id === currentUser?._id;
          const messageDate = chat.createdAt;
          const shouldShowDate = isNewDate(
            messageDate as unknown as string,
            lastDate
          );
          lastDate = messageDate as unknown as string;

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
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 mb-2 max-w-[70%] rounded-lg text-white ${
                    isSender ? "bg-blue-600" : "bg-gray-500"
                  }`}
                >
                  <div className="flex justify-between gap-4 items-end">
                    <p className="break-words">{chat.message}</p>
                    <span className="text-[10px] text-gray-200 min-w-[40px]">
                      {moment(chat.createdAt).format("h:mm A")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      <div ref={bottomRef} />
    </div>
  );
};

export default ContentBody;
