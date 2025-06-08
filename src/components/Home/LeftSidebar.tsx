import { Input } from "antd";
import ChatList from "./ChatList";

const data = [
  {
    name: "Konstantin Frank",
    img: "https://connectme-html.themeyn.com/images/avatar/1.jpg",
    message: "Had they visited Rome before",
    time: "45 min",
  },
  {
    name: "Jasmine Thompson",
    img: "https://connectme-html.themeyn.com/images/avatar/2.jpg",
    message: "Liked that disco music",
    time: "55 min",
  },
  {
    name: "Mathias Devos",
    img: "https://connectme-html.themeyn.com/images/avatar/3.jpg",
    message: "Hey, how's it going?",
    time: "1 day",
  },
  {
    name: "Marie George",
    img: "https://connectme-html.themeyn.com/images/avatar/4.jpg",
    message: "Same here. I've been trying to ke",
    time: "2 days",
  },
  {
    name: "Phillip Burke",
    img: "https://connectme-html.themeyn.com/images/avatar/5.jpg",
    message: "It's been really fun so far",
    time: "3 days",
  },
  {
    name: "Romy Schulte",
    img: "https://connectme-html.themeyn.com/images/avatar/6.jpg",
    message: "That's cool!",
    time: "2 weeks",
  },
  {
    name: "Frances Arnold",
    img: "https://connectme-html.themeyn.com/images/avatar/7.jpg",
    message: "Yeah, I've been trying to paint",
    time: "2 weeks",
  },
  {
    name: "Nina Dubois",
    img: "https://connectme-html.themeyn.com/images/avatar/8.jpg",
    message: "That's awesome! I'd love to see",
    time: "3 weeks",
  },
  {
    name: "Albert Henderson",
    img: "https://connectme-html.themeyn.com/images/avatar/9.jpg",
    message: "Sounds good to me",
    time: "4 weeks",
  },
  {
    name: "Maxim Werner",
    img: "https://connectme-html.themeyn.com/images/avatar/10.jpg",
    message: "Definitely, let's plan on it",
    time: "3 months",
  },
  {
    name: "Nolan Etienne",
    img: "https://connectme-html.themeyn.com/images/avatar/11.jpg",
    message: "Not really, how about we try",
    time: "1 yr",
  },
];

const LeftSidebar = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <h1 className="text-2xl text-gray-600 font-bold p-4">Chats</h1>

      {/* Search input */}
      <div className="px-4 pb-4">
        <Input size="large" placeholder="Search contact / chat" />
      </div>

      {/* Scrollable ChatList */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 mb-10">
        {data?.map((chat, i) => (
          <ChatList key={i} data={chat} />
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
