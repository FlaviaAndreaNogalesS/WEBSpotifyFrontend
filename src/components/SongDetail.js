import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getSongById } from '../services/songService';
import './SongDetail.css';

const SongDetail = () => {
  const { songId } = useParams(); // ID de la canción
  const [song, setSong] = useState(null); //almacena detalles
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null); // Referencia al elemento de audio

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const data = await getSongById(songId); //llamada
        setSong(data);
        setLoading(false);

        // Controla la reproducción
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.load(); // Carga la nueva canción
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.error('Error al reproducir el audio:', error);
            });
          }
        }
      } catch (error) {
        console.error('Error al obtener los detalles de la cancion:', error);
        setLoading(false);
      }
    };

    fetchSong();
  }, [songId]); //cambia el id de la music

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!song) {
    return <div>No se encontró la canción.</div>;
  }

  return (
    <div className="song-detail-container">
      <h2>{song.title}</h2>
      <audio controls className="audio-player" ref={audioRef}>
        <source src={`http://localhost:4000/${song.audioUrl}`} type="audio/mp3" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  );
};

export default SongDetail;
