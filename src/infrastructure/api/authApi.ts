import Axios from "../../service/Axios";

export const fetchLogin = async (email: string, password: string) => {

    const response = await Axios.post(`/api/users/login`, {
        email,
        password,
    });
    
    
    if (!response.data) throw new Error("Erreur lors de l'authentification");
    return await response.data;
};



export const fetchRegister = async (username: string, email: string, password: string) => {

  const response = await Axios.post(`/api/users/register`, {
      username,
      email,
      password,
      online: false
  });
  
  if (!response.data) throw new Error("Erreur lors de l'enregistrement");
  return await response.data;
};
