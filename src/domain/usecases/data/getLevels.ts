// getClient.ts
import { dataRepository } from "../../../application/repository/dataRepository";
import { setLevels } from "../../../redux/data/dataSlice";
import { AppDispatch } from "../../../redux/store";

export const getLevels = () => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await dataRepository.getLevels();
    dispatch(setLevels(data));
  } catch (error) {
    console.error("Erreur dans getClient:", error);
  }
};




