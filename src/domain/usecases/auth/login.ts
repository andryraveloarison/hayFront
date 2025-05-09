// getClient.ts
import { authRepository } from "../../../application/repository/authRepository";
import { setToken } from "../../../redux/auth/authSlice";
import { AppDispatch } from "../../../redux/store";

export const login = (email: string, password: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await authRepository.loginRepo(email, password);
    dispatch(setToken(data));
  } catch (error) {
    console.error("Erreur lors login:", error);
  }
};
