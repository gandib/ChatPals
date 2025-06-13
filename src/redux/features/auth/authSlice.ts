import type { IUser } from "../../../types";

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../type";

type TAuthState = {
  user: null | IUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) =>
  (state.auth as TAuthState).token;
export const selectCurrentUser = (state: RootState) =>
  (state.auth as TAuthState).user;
export const afterLogoutBaseApiQueryEmpty = (state: RootState) => state.baseApi;
