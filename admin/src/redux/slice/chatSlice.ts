import { IChat } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IChatState {
  chat: null | IChat;
  chatList: IChat[];
  refetch: boolean;
  loading: boolean;
}

const initialState: IChatState = {
  chat: null,
  chatList: [],
  refetch: false,
  loading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<IChat>) => {
      state.chat = action.payload;
    },
    addChatList: (state, action: PayloadAction<IChat | IChat[]>) => {
      if (Array.isArray(action.payload)) {
        state.chatList = action.payload;
        return;
      }

      const sentChat = action.payload as IChat;

      const chatExist = state.chatList.find(
        (chat) => chat.userId === sentChat.userId
      );

      if (chatExist) {
        state.chatList[
          state.chatList.findIndex((chat) => chat.userId === sentChat.userId)
        ] = action.payload;
      } else {
        state.chatList = [...state.chatList, action.payload];
      }
    },
    clearChat: (state) => {
      state.chat = null;
    },
    refetchChats: (state) => {
      state.refetch = !state.refetch;
    },
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addChat, addChatList, clearChat, refetchChats, updateLoading } =
  chatSlice.actions;
export default chatSlice.reducer;
