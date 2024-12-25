import {  IUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  token: null | string;
  user: null | IUser;
}

const initialState: IUserState = {
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUserState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { addUser, clearUser, setToken, clearToken } = userSlice.actions;
export default userSlice.reducer;
