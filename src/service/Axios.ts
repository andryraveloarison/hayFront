import axios from 'axios'

const Axios = axios.create({
    // baseURL: 'http://192.168.1.159:3000/'
    baseURL: 'http://localhost:3000/'
    // baseURL:'https://fd22-41-74-213-153.ngrok-free.app/'
})

/**
 * Intercepteur pour le token
 */
Axios.interceptors.response.use(
    response => response,
    error => {
        // Si une erreur de réponse est détectée
        if (!error.response) {
            // Erreur réseau ou serveur inaccessible
            throw new Error('Network Error');
        }
        return Promise.reject(error);
    }
);


export default Axios

// export const urlBack = "http://192.168.1.173:4000"
// export const urlBack = "https://ecozipo-codesource.onrender.com"