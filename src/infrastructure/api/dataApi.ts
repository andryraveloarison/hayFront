import { Level } from "../../pages/page/admin/LevelManager";
import Axios from "../../service/Axios";

export const fetchLevels = async () : Promise<Level[]> => {
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

export const fetchCourses = async () => {
    const response = await Axios.get(`/api/courses/getAll`)
    if (!response.data) throw new Error("Erreur lors du chargement des clients");
    return await response.data;
};

export const getCourseByChapterId = async (id:string) => {
    const response = await Axios.get(`/api/courses/getByChapterId/${id}`)
    if (!response) throw new Error("Erreur lors du chargement des clients");
    return await response.data;
};


export const addLevel = async (newLevel: Level) => {
    const response = await Axios.post("/api/levels/create", newLevel);
    if (!response) throw new Error("Erreur lors de la creation du niveau");
    return await response.data;
}

export const addSubject = async (newSubject:any) => {
    const response = await Axios.post("/api/subjects/create", newSubject);
    if (!response) throw new Error("Erreur lors de la creation du niveau");
    return await response.data;
}


export const addCourse = async (newCourse: any) => {
    const response = await Axios.post("/api/courses/create", newCourse);
    if (!response) throw new Error("Erreur lors de la creation du niveau");
    return await response.data;
}


export const addChapter = async (newChapter: any) => {
    const response = await Axios.post("/api/chapters/create", newChapter);
    if (!response) throw new Error("Erreur lors de la creation du niveau");
    return await response.data;
}


