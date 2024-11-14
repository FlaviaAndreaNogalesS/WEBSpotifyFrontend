import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getArtistsByGenre } from '../services/artistService';
import './ArtistsList.css';

const ArtistsList = () => {
  const { genreId } = useParams(); //obtiene id
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getArtistsByGenre(genreId); //llama al servico
        setArtists(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener artists:', error);
        setLoading(false);
      }
    };

    fetchArtists();
  }, [genreId]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Artistas</h1>
      <div className="row">
        {artists.map((artist) => (
          <div key={artist.id} className="col-md-3 mb-4" onClick={() => navigate(`/artist/${artist.id}`)}>
            <div className="card artist-card shadow-sm">
              <img src={`http://localhost:4000/${artist.image}`} alt={artist.name} className="card-img-top artist-image" />
              <div className="card-body text-center">
                <h5 className="card-title">{artist.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistsList;
