import type { TChat, TUserChat } from "../../../types";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../type";

type TMessageState = {
  userChat: TUserChat | null;
  chats: TChat[];
};

const initialState: TMessageState = {
  userChat: null,
  chats: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setUserChat: (state, action) => {
      state.userChat = action.payload;
    },
    setChat: (state, action) => {
      if (state.userChat) {
        console.log(action.payload);
        state.userChat.chats = [...state.userChat.chats, action.payload];
      }
    },
  },
});

export const { setUserChat, setChat } = messageSlice.actions;

export default messageSlice.reducer;

export const getUserChat = (state: RootState) => state.message.userChat;
