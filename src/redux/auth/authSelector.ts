import { RootState } from "../store";

export const getToken = (state: RootState) => state.auth.token;
export const getSuccessLogin = (state: RootState) => state.auth.success;
