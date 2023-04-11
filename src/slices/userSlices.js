import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: localStorage.getItem("allUserLoginInfo")
      ? JSON.parse(localStorage.getItem("allUserLoginInfo"))
      : null,
    getPhoto:null,
  },
  reducers: {
    userLoginInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    userProfileUpdate: (state, action) => {
      state.getPhoto = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLoginInfo, userProfileUpdate } = userSlice.actions;

export default userSlice.reducer;
