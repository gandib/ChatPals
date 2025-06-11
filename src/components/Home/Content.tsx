/* eslint-disable @typescript-eslint/no-explicit-any */
import ContentBody from "./ContentBody";
import ContentFooter from "./ContentFooter";
import ContentHeader from "./ContentHeader";
import { useEffect, useState } from "react";
import socket from "../../socket";
import axios from "axios";
import type { IMessage } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { getReceiverUser } from "../../redux/features/user/userSlice";
import {
  getUserChat,
  setChat,
} from "../../redux/features/message/messageSlice";
import messageApi from "../../redux/features/message/messageApi";

const Content = () => {
  const user = useAppSelector(selectCurrentUser);
  const mutualUser = useAppSelector(getUserChat);
  const receiver = useAppSelector(getReceiverUser) || mutualUser;
  const roomId = [user?._id, receiver?._id].sort().join("_");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user && !receiver) return;

    const roomId = [user?._id, receiver?._id].sort().join("_");
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
    const payload: any = {
      message: text.trim() || undefined,
      sender: user?._id,
      receiver: receiver?._id,
      roomId,
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        payload.image = reader.result;
        socket.emit("sendMessage", payload);
      };
      reader.readAsDataURL(imageFile);
    } else {
      if (payload.message) {
        socket.emit("sendMessage", payload);
      }
    }

    setText("");
    setImageFile(undefined);
  };

  useEffect(() => {
    if (messages) {
      dispatch(setChat(messages[messages?.length - 1]));
      dispatch(messageApi.util.invalidateTags(["message"]));
    }
  }, [messages, dispatch]);

  console.log(messages);

  return (
    <div>
      {/* header  */}
      <div>
        <ContentHeader />
      </div>

      {/* body  */}
      <div>
        <ContentBody imageFile={imageFile!} setImageFile={setImageFile} />
      </div>

      {/* footer  */}
      <div>
        <ContentFooter
          setText={setText}
          text={text}
          sendMessage={sendMessage}
          imageFile={imageFile}
          setImageFile={setImageFile}
        />
      </div>
    </div>
  );
};

export default Content;
