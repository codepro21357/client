import { IUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  token?: null | string;
  userId?: string | undefined;
  user: null | IUser;
}

const initialState: IUserState = {
  token: null,
  userId: "",
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUserState>) => {
      state.token = action.payload.token;
      state.userId = action.payload.user?._id;
      state.user = action.payload.user;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    deleteUserId: (state) => {
      state.userId = "";
    },
  },
});

export const { addUser, setToken, clearToken, deleteUserId } =
  userSlice.actions;
export default userSlice.reducer;
