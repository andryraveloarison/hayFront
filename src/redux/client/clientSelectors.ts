import { RootState } from "../store";

export const selectClients = (state: RootState) => state.client.clients;
export const selectClientsReceiver = (state: RootState) => state.client.clientReceiver;
export const selectClientsSender = (state: RootState) => state.client.clientSender;
