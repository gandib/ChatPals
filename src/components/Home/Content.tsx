/* eslint-disable @typescript-eslint/no-explicit-any */
import ContentBody from "./ContentBody";
import ContentFooter from "./ContentFooter";
import ContentHeader from "./ContentHeader";
import { useEffect, useState } from "react";
import socket from "../../socket";
import axios from "axios";
import type { IMessage } from "../../types";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { getReceiverUser } from "../../redux/features/user/userSlice";

const Content = () => {
  const user = useAppSelector(selectCurrentUser);
  const receiver = useAppSelector(getReceiverUser);
  const roomId = [user?._id, receiver?._id].sort().join("_");
  // const roomId = "6846e79b55e3e0d3e3b07ef6_6846e887b56514124cc9fe44";
  // console.log(roomId);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!user && !receiver) return;

    const roomId = [user?._id, receiver?._id].sort().join("_");
    // const roomId = "6846e79b55e3e0d3e3b07ef6_6846e887b56514124cc9fe44";
    console.log(roomId);
    socket.emit("joinRoom", roomId);

    const getMessages = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API}/api/message/${roomId}`
      );
      setMessages(res.data);
    };
    getMessages();

    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    //  Clean up properly
    return () => {
      socket.off("newMessage");
    };
  }, [user, receiver]);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      message: text,
      sender: user?._id,
      receiver: receiver?._id,
      roomId,
    });
    setText("");
  };

  console.log(messages);

  return (
    <div>
      {/* header  */}
      <div>
        <ContentHeader />
      </div>

      {/* body  */}
      <div>
        <ContentBody />
      </div>

      {/* footer  */}
      <div>
        <ContentFooter
          setText={setText}
          text={text}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Content;
