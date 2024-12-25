import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slice/userSlice";
import chatReducer from "./slice/chatSlice";

const userPersistConfig = {
  key: "user",
  version: 1,
  storage,
  blacklist: ["token", "user"],
};

const userPersistedReducer = persistReducer(userPersistConfig, userReducer);

const rootReducer = combineReducers({
  user: userPersistedReducer,
  chat: chatReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
