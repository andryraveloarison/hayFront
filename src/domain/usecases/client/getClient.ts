// getClient.ts
import { authRepository } from "../../../application/repository/authRepository";
import { clientRepository } from "../../../application/repository/clientRepository";
import { setClientReceiver, setClients, setClientSender } from "../../../redux/client/clientSlice";
import { AppDispatch } from "../../../redux/store";

export const getClient = () => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await clientRepository.getClients();
    dispatch(setClients(data));
  } catch (error) {
    console.error("Erreur dans getClient:", error);
  }
};


export const getClientRecever = (id: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await clientRepository.getClientById(id);
    dispatch(setClientReceiver(data));
  } catch (error) {
    console.error("Erreur dans get client by id:", error);
  }
};


export const getClientSender = (email: string, password: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    
    const data = await authRepository.loginRepo(email, password);
    
    dispatch(setClientSender(data));
  } catch (error) {
    console.error("Erreur dans get client by id:", error);
  }
};
