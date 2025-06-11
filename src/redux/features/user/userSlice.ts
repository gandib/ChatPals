import type { IUser } from "../../../types";

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../type";

type TUserState = {
  receiverUser: null | IUser;
};

const initialState: TUserState = {
  receiverUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setReceiverUser: (state, action) => {
      state.receiverUser = action.payload;
    },
  },
});

export const { setReceiverUser } = userSlice.actions;

export default userSlice.reducer;

export const getReceiverUser = (state: RootState) => state.user.receiverUser;
