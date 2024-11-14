import axios from 'axios';

const API_URL = 'http://localhost:4000/albums';

export const getAlbumsByArtist = async (artistId) => {
  try { //GET pa obtener los albums del artista
    const response = await axios.get(`${API_URL}/artist/${artistId}`);
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error('Error al recuperar álbumes:', error);
    throw error;
  }
};

export const getAlbumById = async (albumId) => {
  try {
    const response = await axios.get(`${API_URL}/${albumId}`);
    return response.data;
  } catch (error) {
    console.error('Error al recuperar álbumes:', error);
    throw error;
  }
};
