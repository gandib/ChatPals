import { getUserChat } from "../../redux/features/message/messageSlice";
import { getReceiverUser } from "../../redux/features/user/userSlice";
import { useAppSelector } from "../../redux/hooks";

const RightBody = () => {
  const userChat = useAppSelector(getUserChat);
  const receiver = useAppSelector(getReceiverUser);

  // Extract all non-null chat images
  const chatImages = receiver?._id
    ? userChat
        .filter((user) => user._id === receiver?._id)[0]
        ?.chats?.filter((chat) => chat.image) ?? []
    : userChat[0]?.chats?.filter((chat) => chat.image) ?? [];

  return (
    <div>
      <h1 className="border-2 border-b-gray-100 border-t-0 border-x-0 p-2 text-blue-500 font-semibold">
        Images
      </h1>

      {/* Display dynamic chat images only */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {chatImages.map((chat) => (
          <div key={chat._id}>
            <img
              src={chat.image}
              alt="chat"
              className="w-24 h-24 rounded-lg object-cover"
            />
          </div>
        ))}

        {/* Display sample/static images if no chat images exist */}
        {chatImages.length === 0 && (
          <>
            {[
              "1.jpg",
              "2.jpg",
              "3.jpg",
              "4.jpg",
              "5.jpg",
              "6.jpg",
              "thumb-1.jpg",
              "3.jpg",
              "2.jpg",
            ].map((img, idx) => (
              <div key={idx}>
                <img
                  src={`https://connectme-html.themeyn.com/images/gallery/chat/${img}`}
                  alt={`sample-${idx}`}
                  className="w-24 h-24 rounded-lg object-cover"
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RightBody;
