import { fetchLogin, fetchRegister } from "../../infrastructure/api/authApi";


export const authRepository = {
  loginRepo: async (email: string, password: string) => {
    return await fetchLogin(email, password);
  },


  registerRepo: async (username: string, email: string, password: string) => {
    return await fetchRegister(username, email, password);
  },
};
