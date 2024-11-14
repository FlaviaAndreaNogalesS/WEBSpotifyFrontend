import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumsByArtist } from '../services/albumService';
import './AlbumsList.css';
import { getSongById } from '../services/songService';

const AlbumsList = () => {
  const { artistId } = useParams(); //obtiene el id del artista
  const [albums, setAlbums] = useState([]); //almacena la lista
  const [loading, setLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState(null); //cancion seleccionada
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await getAlbumsByArtist(artistId); //llamada al servicio
        setAlbums(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener albums:', error);
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [artistId]);

  const handleSongClick = async (songId) => {
    try {
      const song = await getSongById(songId); // Llama al servicio
      setSelectedSong(song);
  
      if (audioRef.current) {
        audioRef.current.pause(); //pausa audio
  
        setTimeout(() => {
          audioRef.current.load(); //carga nuevo audio
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.error('Error al reproducir el audio:', error);
            });
          }
        }, 100); //espera pa reproducir otro audio
      }
    } catch (error) {
      console.error('Error fetching song:', error);
    }
  };
  

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Álbumes</h1>
      <div className="row">
        {albums.map((album) => (
          <div key={album.id} className="col-md-12 mb-4">
            <div className="card album-card shadow-sm">
              <img src={`http://localhost:4000/${album.image}`} alt={album.title} className="card-img-top album-image" />
              <div className="card-body">
                <h5 className="card-title">{album.title}</h5>
                <ul className="list-group list-group-flush">
                  {album.songs.map((song) => (
                    <li key={song.id} className="list-group-item" onClick={() => handleSongClick(song.id)}>
                      {song.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reproductor de audio */}
      {selectedSong && (
        <div className="audio-player mt-4">
          <h5>Reproduciendo: {selectedSong.title}</h5>
          <audio controls className="w-100" ref={audioRef}>
            <source src={`http://localhost:4000/${selectedSong.audioUrl}`} type="audio/mp3" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
      )}
    </div>
  );
};

export default AlbumsList;
