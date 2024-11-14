import axios from 'axios';

const API_URL = 'http://localhost:4000/songs';

export const getSongById = async (songId) => {
  try {
    const response = await axios.get(`${API_URL}/${songId}`);
    return response.data;
  } catch (error) {
    console.error('Error al buscar la canción:', error);
    throw error;
  }
};

