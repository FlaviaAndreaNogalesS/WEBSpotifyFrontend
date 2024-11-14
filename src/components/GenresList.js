import React, { useEffect, useState } from 'react';
import { getAllGenres } from '../services/genreService';
import './GenresList.css';
import { useNavigate } from 'react-router-dom';

const GenresList = () => {
  const [genres, setGenres] = useState([]); //almacena generos
  const [search, setSearch] = useState(''); //filtro busqueda
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getAllGenres(search); //llamada
        setGenres(data);
      } catch (error) {
        console.error('Error al obtener generos:', error);
      }
    };

    fetchGenres();
  }, [search]);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Géneros Musicales</h1>
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Buscar género"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="row">
        {genres.map((genre) => (
          <div key={genre.id} className="col-md-3 mb-4" onClick={() => navigate(`/genre/${genre.id}`)}>
            <div className="card genre-card-container shadow-sm">
              <img src={`http://localhost:4000/${genre.image}`} alt={genre.name} className="card-img-top genre-image" />
              <div className="genre-title">
                <h5>{genre.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenresList;
