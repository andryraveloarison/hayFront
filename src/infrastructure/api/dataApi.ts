import Axios from "../../service/Axios";

export const fetchLevels = async () => {
    const response = await Axios.get(`/api/levels/getAll`)
    if (!response.data) throw new Error("Erreur lors du chargement des clients");
    return await response.data;
};

export const fetchSubjects = async () => {
    const response = await Axios.get(`/api/subjects/getAll`)
    if (!response.data) throw new Error("Erreur lors du chargement des clients");
    return await response.data;
};


export const fetchChapters = async () => {
    const response = await Axios.get(`/api/chapters/getAll`)
    if (!response.data) throw new Error("Erreur lors du chargement des clients");
    return await response.data;
};





