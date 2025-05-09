import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "./type";

const initialState: DataState = {
    status: "idle",
    error: null,
    levels: [],
    subjects: [],
    chapters: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setLevels: (state, action) => {
      state.levels = action.payload;
    },

    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },

    setChapters: (state, action) => {
      
      state.chapters = action.payload;
    },
  },
});

export const { setLevels } = dataSlice.actions;
export const { setChapters } = dataSlice.actions;
export const { setSubjects } = dataSlice.actions;

export default dataSlice.reducer;


