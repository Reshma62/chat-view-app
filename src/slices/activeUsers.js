import { createSlice } from "@reduxjs/toolkit";

export const activeUserSlice = createSlice({
  name: "activeUser",
  initialState: {
    activeUserInfo: localStorage.getItem("activeChatUsers")
      ? JSON.parse(localStorage.getItem("activeChatUsers"))
      : null,
  },
  reducers: {
    activeUsersInfo: (state, action) => {
      state.activeUserInfo = action.payload;
    },
  },
});
export const { activeUsersInfo } = activeUserSlice.actions;

export default activeUserSlice.reducer;
