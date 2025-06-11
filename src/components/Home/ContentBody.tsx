import { useEffect, useRef } from "react";
import { useAppSelector } from "../../redux/hooks";
import { getUserChat } from "../../redux/features/message/messageSlice";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import moment from "moment";

const ContentBody = ({
  imageFile,
  setImageFile,
}: {
  imageFile: File | undefined;
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}) => {
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
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 mb-2 max-w-[70%] rounded-lg text-white ${
                    isSender ? "bg-blue-600" : "bg-gray-500"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    {/* Show image if exists */}
                    {chat.image && (
                      <img
                        src={chat.image}
                        alt="sent-media"
                        className="rounded-md max-w-[200px] max-h-[200px] object-cover"
                      />
                    )}

                    {/* Show message if exists */}
                    {chat.message && (
                      <p className="break-words">{chat.message}</p>
                    )}

                    <span className="text-[10px] text-gray-200 text-right">
                      {moment(chat.createdAt).format("h:mm A")}
                    </span>
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
