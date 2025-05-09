import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./type";

const initialState: UserState = {
    status: "idle",
    error: null,
    clientReceiver: null,
    clientSender: null,
    clients: [],
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },

    setClientReceiver: (state, action) => {
      state.clientReceiver = action.payload;
    },

    setClientSender: (state, action) => {
      
      state.clientSender = action.payload.user;
    },
  },
});

export const { setClients } = clientSlice.actions;
export const { setClientReceiver } = clientSlice.actions;
export const { setClientSender } = clientSlice.actions;

export default clientSlice.reducer;


