// Peticiones que se hacen hacia el backend
import axios from 'axios';

const API = 'http://localhost:8000/'

export const registerRequest = async (usuario) => axios.post(`${API}registro`, usuario);

export const loginRequest = async (usuario) => axios.post(`${API}acceso`, usuario);

export const DescargaRequest = async () => axios.post(`${API}descarga`);


export const logoutRequest = async (usuario) => axios.post(`${API}salir`,usuario,{
    headers: {
        'Authorization': `Token ${usuario.token}`  
      }
}
);

export const ValidacionRequerida = async () => axios.get(`${API}acceso`);