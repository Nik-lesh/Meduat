// have to look into this still not sure about how to do it just for the time being its working

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
// this is type script for entire state type which is defined as when you set up your store to specify the structure of your application’s state

export type RootState = ReturnType<typeof store.getState>;
// this is type script for the dispatch function which is used to dispatch actions to the Redux store
export type AppDispatch = typeof store.dispatch;
