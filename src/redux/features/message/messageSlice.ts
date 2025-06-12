import type { TChat, TUserChat } from "../../../types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../type";

type TMessageState = {
  userChat: TUserChat[];
  chats: TChat[];
};

const initialState: TMessageState = {
  userChat: [],
  chats: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setUserChat: (state, action: PayloadAction<TUserChat>) => {
      if (!action.payload) return;

      const roomId = action.payload?.chats?.[0]?.roomId;
      const alreadyExists = state.userChat.some(
        (userChat) => userChat?.chats?.[0]?.roomId === roomId
      );

      if (!alreadyExists) {
        state.userChat.push(action.payload);
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
  },
});

export const { setUserChat, setChat } = messageSlice.actions;

export default messageSlice.reducer;

export const getUserChat = (state: RootState) => state.message.userChat;
