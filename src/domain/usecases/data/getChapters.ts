import { dataRepository } from "../../../application/repository/dataRepository";
import { setChapters } from "../../../redux/data/dataSlice";
import { AppDispatch } from "../../../redux/store";

export const getChapters = () => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await dataRepository.getChapters();
    dispatch(setChapters(data));
  } catch (error) {
    console.error("Erreur dans getClient:", error);
  }
};




