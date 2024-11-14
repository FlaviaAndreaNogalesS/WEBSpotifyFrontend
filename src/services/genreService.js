import axios from 'axios';

const API_URL = 'http://localhost:4000/genres';

export const getAllGenres = async (search = '') => {
  try {
    const response = await axios.get(`${API_URL}?search=${search}`);
    return response.data;
  } catch (error) {
    console.error('Error al recuperar generos:', error);
    throw error;
  }
};
