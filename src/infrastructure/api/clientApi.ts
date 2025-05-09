import Axios from "../../service/Axios";

export const fetchClients = async () => {
    const response = await Axios.get(`/api/users/getAll`)
    if (!response.data) throw new Error("Erreur lors du chargement des clients");
    return await response.data;
};



export const fetchClientByid = async (id: string) => {
    const response = await Axios.get(`/api/users/getById/${id}`)
    
    if (!response.data) throw new Error("Erreur lors du chargement des clients");
    return await response.data;
};

