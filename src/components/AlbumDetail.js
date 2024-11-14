import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumById } from '../services/albumService';
import './AlbumDetail.css';

const AlbumDetail = () => {
  const { albumId } = useParams(); //obtiene el id del album
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true); //carga

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const data = await getAlbumById(albumId); //llama al servicio
        setAlbum(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los detalles del album:', error);
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [albumId]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!album) {
    return <div>No se encontró el álbum.</div>;
  }

  return (
    <div className="album-detail-container">
      <h2>{album.title}</h2>
      <img src={`http://localhost:4000/${album.image}`} alt={album.title} />
      {}
    </div>
  );
};

export default AlbumDetail;
