import { configureStore } from "@reduxjs/toolkit";
// import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { apiSlice } from "../features/api/apiSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    users: usersReducer,
  },
  middleware: curryGetDefaultMiddleware => curryGetDefaultMiddleware().concat(apiSlice.middleware)
})