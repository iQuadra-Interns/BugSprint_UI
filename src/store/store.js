// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import bugListReducer from "./bugListReducer"; // Import bugList reducer

const store = configureStore({
  reducer: {
    auth: authReducer, // Auth reducer for user authentication
    bugList: bugListReducer, // Bug list reducer
  },
});

export default store;
