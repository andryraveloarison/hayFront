import { fetchClientByid, fetchClients } from "../../infrastructure/api/clientApi";


export const clientRepository = {
  getClients: async () => {
    return await fetchClients();
},


  getClientById: async (id: string) => {
    return await fetchClientByid(id);
  },
};
