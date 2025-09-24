import { configureStore } from "@reduxjs/toolkit";
import contractReducer from "./slices/contractSlice";

const store = configureStore({
  reducer: {
    contract: contractReducer, // now state.contract
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🚨 disables warnings
    }),
});

export default store;
