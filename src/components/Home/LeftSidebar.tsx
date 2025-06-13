/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "antd";
import ChatList from "./ChatList";
import { useEffect, useState } from "react";
import { useDebounce } from "../../utils/debounce";
import { toast } from "sonner";
import userApi from "../../redux/features/user/userApi";
import type { TError } from "../../types";
import messageApi from "../../redux/features/message/messageApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUserChat } from "../../redux/features/message/messageSlice";

// const data = [
//   {
//     _id: "1",
//     name: "Konstantin Frank",
//     image: "https://connectme-html.themeyn.com/images/avatar/1.jpg",
//     message: "Had they visited Rome before",
//     time: "45 min",
//   },
//   {
//     _id: "2",
//     name: "Jasmine Thompson",
//     image: "https://connectme-html.themeyn.com/images/avatar/2.jpg",
//     message: "Liked that disco music",
//     time: "55 min",
//   },
//   {
//     _id: "3",
//     name: "Mathias Devos",
//     image: "https://connectme-html.themeyn.com/images/avatar/3.jpg",
//     message: "Hey, how's it going?",
//     time: "1 day",
//   },
//   {
//     _id: "4",
//     name: "Marie George",
//     image: "https://connectme-html.themeyn.com/images/avatar/4.jpg",
//     message: "Same here. I've been trying to ke",
//     time: "2 days",
//   },
//   {
//     _id: "5",
//     name: "Phillip Burke",
//     image: "https://connectme-html.themeyn.com/images/avatar/5.jpg",
//     message: "It's been really fun so far",
//     time: "3 days",
//   },
//   {
//     _id: "6",
//     name: "Romy Schulte",
//     image: "https://connectme-html.themeyn.com/images/avatar/6.jpg",
//     message: "That's cool!",
//     time: "2 weeks",
//   },
//   {
//     _id: "7",
//     name: "Frances Arnold",
//     image: "https://connectme-html.themeyn.com/images/avatar/7.jpg",
//     message: "Yeah, I've been trying to paint",
//     time: "2 weeks",
//   },
//   {
//     _id: "8",
//     name: "Nina Dubois",
//     image: "https://connectme-html.themeyn.com/images/avatar/8.jpg",
//     message: "That's awesome! I'd love to see",
//     time: "3 weeks",
//   },
//   {
//     _id: "9",
//     name: "Albert Henderson",
//     image: "https://connectme-html.themeyn.com/images/avatar/9.jpg",
//     message: "Sounds good to me",
//     time: "4 weeks",
//   },
//   {
//     _id: "10",
//     name: "Maxim Werner",
//     image: "https://connectme-html.themeyn.com/images/avatar/10.jpg",
//     message: "Definitely, let's plan on it",
//     time: "3 months",
//   },
//   {
//     _id: "11",
//     name: "Nolan Etienne",
//     image: "https://connectme-html.themeyn.com/images/avatar/11.jpg",
//     message: "Not really, how about we try",
//     time: "1 yr",
//   },
// ];

const LeftSidebar = () => {
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const [email, setEmail] = useState("");
  const debouncedEmail = useDebounce(email, 500);
  const dispatch = useAppDispatch();
  const isEmailValid = isValidEmail(debouncedEmail);

  const { data: userData, error } = userApi.useGetUserQuery(debouncedEmail, {
    skip: !isEmailValid,
  });

  const { data: mutualConnections } = messageApi.useGetMutualConnectionsQuery(
    [],
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    mutualConnections?.data?.connections.map((user: any) => {
      dispatch(setUserChat(user));
    });
  }, [mutualConnections, dispatch]);

  if (error) {
    const errorMessage = String((error as TError).data?.message);
    toast.error(errorMessage);
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <h1 className="text-2xl text-gray-600 font-bold p-4">Chats</h1>

      {/* Search input */}
      <div className="px-4 pb-4">
        <Input
          size="large"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Search by email"
        />
      </div>

      {/* Scrollable ChatList */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 mb-10">
        {isValidEmail(debouncedEmail) && userData && (
          <ChatList key={userData?.data?._id} data={userData?.data} />
        )}
        {!isValidEmail(debouncedEmail) &&
          mutualConnections?.data?.connections?.map((mutualUsers: any) => (
            <ChatList key={mutualUsers._id} data={mutualUsers} />
          ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
