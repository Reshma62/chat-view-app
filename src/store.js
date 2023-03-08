import { configureStore } from "@reduxjs/toolkit";
import userSlices from "./slices/userSlices";
import activeUserSlice from "./slices/activeUsers"
export default configureStore({
  reducer: {
    alluserLoginInfo: userSlices,
    activeUserChat: activeUserSlice,
  },
});
