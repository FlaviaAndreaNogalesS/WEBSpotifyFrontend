import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GenresList from './components/GenresList';
import ArtistsList from './components/ArtistsList';
import AlbumsList from './components/AlbumsList';

import SearchBar from './components/SearchBar';
import SongDetail from './components/SongDetail';
import AlbumDetail from './components/AlbumDetail';

function App() {
  return (
    <Router>
      <SearchBar />
      <Routes>
        <Route path="/" element={<GenresList />} />
        <Route path="/genre/:genreId" element={<ArtistsList />} />
        <Route path="/artist/:artistId" element={<AlbumsList />} />
        <Route path="/song/:songId" element={<SongDetail />} />
        <Route path="/album/:albumId" element={<AlbumDetail />} />

      </Routes>
    </Router>
  );
}

export default App;
