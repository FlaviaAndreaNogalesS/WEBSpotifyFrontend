import axios from 'axios';

const API_URL = 'http://localhost:4000/artists';

export const getArtistsByGenre = async (genreId) => {
  try {
    const response = await axios.get(`${API_URL}/genre/${genreId}`);
    return response.data;
  } catch (error) {
    console.error('Error al recuperar artistas:', error);
    throw error;
  }
};
