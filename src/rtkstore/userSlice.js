import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state) => state,
    addUsers: (state, action) => {
        console.log(state,action)
      state.user = action.payload;
    },
  },
});

export const { getUsers, addUsers } = userSlice.actions;

export default userSlice.reducer;
