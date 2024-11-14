import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; //navega a otras rutas
import { searchGlobal } from '../services/searchService';
import './SearchBar.css';

const SearchBar = () => { //estados pa la busqueda
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ artists: [], albums: [], songs: [] });
  const navigate = useNavigate(); // Hook para navegar

  const handleSearch = async () => {
    try {
      const data = await searchGlobal(query); //llamada
      setResults(data);
    } catch (error) {
      console.error('Error al obtener los resultados de la busqueda:', error);
    }
  };

  //al dar clic navega a la pagina
  const handleResultClick = (type, id) => {
    if (type === 'artist') {
      navigate(`/artist/${id}`);
    } else if (type === 'album') {
      navigate(`/album/${id}`);
    } else if (type === 'song') {
      navigate(`/song/${id}`);
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar artistas, álbumes o canciones..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Buscar</button>
      </div>
      <div className="search-results">
        {results.artists.length > 0 && (
          <div>
            <h3>Artistas</h3>
            <ul>
              {results.artists.map((artist) => (
                <li key={artist.id} onClick={() => handleResultClick('artist', artist.id)}>
                  {artist.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {results.albums.length > 0 && (
          <div>
            <h3>Álbumes</h3>
            <ul>
              {results.albums.map((album) => (
                <li key={album.id} onClick={() => handleResultClick('album', album.id)}>
                  {album.title}
                </li>
              ))}
            </ul>
          </div>
        )}
        {results.songs.length > 0 && (
          <div>
            <h3>Canciones</h3>
            <ul>
              {results.songs.map((song) => (
                <li key={song.id} onClick={() => handleResultClick('song', song.id)}>
                  {song.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
