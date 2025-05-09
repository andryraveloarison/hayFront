import { fetchChapters, fetchLevels, fetchSubjects } from "../../infrastructure/api/dataApi";


export const dataRepository = {
    getLevels: async () => {
        return await fetchLevels();
    },

    getSubjects: async () => {
        return await fetchSubjects();
    },

    getChapters: async () => {
        return await fetchChapters();
    },

};
