import { dataRepository } from "../../../application/repository/dataRepository";
import { setSubjects } from "../../../redux/data/dataSlice";
import { AppDispatch } from "../../../redux/store";

export const getSubjects = () => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await dataRepository.getSubjects();
    dispatch(setSubjects(data));
  } catch (error) {
    console.error("Erreur dans getClient:", error);
  }
};




