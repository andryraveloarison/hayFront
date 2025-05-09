import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from './type';

const initialState: AuthState = {
    status: "idle",
    error: null,
    token: null,
    success: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.success = action.payload.success;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;


