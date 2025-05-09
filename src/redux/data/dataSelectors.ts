import { RootState } from "../store";

export const selectLevels = (state: RootState) => state.data.levels;
export const selectChapters = (state: RootState) => state.data.chapters;
export const selectSubjects = (state: RootState) => state.data.subjects;
