import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // тут можна додати інші редьюсери, наприклад products, orders
  },
});

// Типи для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
