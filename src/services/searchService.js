import axios from 'axios';

const API_URL = 'http://localhost:4000/search';

export const searchGlobal = async (query) => {
  try {
    const response = await axios.get(`${API_URL}?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos de búsqueda:', error);
    throw error;
  }
};
