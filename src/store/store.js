import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../features/AuthSlice";
import userSlice from "../features/UserSlice";

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        users: userSlice
    }
}) 