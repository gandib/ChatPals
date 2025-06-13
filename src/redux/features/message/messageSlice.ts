import type { TChat, TUserChat } from "../../../types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../type";

type TMessageState = {
  userChat: TUserChat[];
  isChatOpen: boolean;
};

const initialState: TMessageState = {
  userChat: [],
  isChatOpen: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setUserChat: (state, action: PayloadAction<TUserChat>) => {
      if (!action.payload) return;

      const incomingRoomId = action.payload.chats?.[0]?.roomId;

      const alreadyExists = state.userChat.some(
        (userChat) => userChat.chats?.[0]?.roomId === incomingRoomId
      );

      if (!alreadyExists) {
        if (
          state.userChat.length > 0 &&
          state.userChat[state.userChat.length - 1]._id === action.payload._id
        ) {
          state.userChat[state.userChat.length - 1] = action.payload;
        } else {
          state.userChat.push(action.payload);
        }
      }
    },

    setChat: (state, action: PayloadAction<TChat>) => {
      if (!action.payload) return;

      const { roomId } = action.payload;
      const chatGroup = state.userChat.find(
        (group) => group.chats?.[0]?.roomId === roomId
      );

      if (chatGroup) {
        chatGroup.chats.push(action.payload);
      }
    },

    updateReadBy: (
      state,
      action: PayloadAction<{ senderId: string; receiverId: string }>
    ) => {
      const { senderId, receiverId } = action.payload;

      const chatGroup = state.userChat.find((group) => group._id === senderId);

      if (!chatGroup) {
        console.warn("No chat group found for senderId:", senderId);
        return;
      }

      chatGroup?.chats.forEach((chat) => {
        const chatReceiverId = chat.receiver?._id ?? chat.receiver;

        if (
          chatReceiverId === receiverId &&
          !chat.readBy.includes(receiverId)
        ) {
          if (!Array.isArray(chat.readBy)) {
            chat.readBy = [];
          }
          chat.readBy.push(receiverId);
        }
      });
    },

    setChatOpen: (state, action) => {
      state.isChatOpen = action.payload;
    },
  },
});

export const { setUserChat, setChat, updateReadBy, setChatOpen } =
  messageSlice.actions;

export default messageSlice.reducer;

export const getUserChat = (state: RootState) => state.message.userChat;
export const isChatOpen = (state: RootState) => state.message.isChatOpen;
