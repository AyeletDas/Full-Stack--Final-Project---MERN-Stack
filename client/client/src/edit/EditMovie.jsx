import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

/*
5 – “Edit Movie” Page:
  This page allows us to update a movie data
  - A click on “Update” button will save the updated data in the DB
  - A click on “Cancel” button will redirect to the “All Movies” page
*/

const EditMovie = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const location = useLocation(); // Show username in URL 
  const params = new URLSearchParams(location.search); // Show username in URL 
  const username = params.get('username'); // Show username in URL 


  const [movie, setMovie] = useState(null);
  const [name, setName] = useState('');
  const [genres, setGenres] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [premiered, setPremiered] = useState('');

  // Update Movie
  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/movies/${id}`);
        const movieData = response.data;
        setMovie(movieData);
        setName(movieData.name);
        setGenres(movieData.genres.join(', '));
        setImageUrl(movieData.an_image_url);
        setPremiered(movieData.year_premiered);
      } catch (error) {
        console.error('Error get movie:', error);
      }
    };

    getMovie();
  }, [id]);

  const navigateToAllMovies = () => {
    navigate(`/movies?username=${username}`);
  };

  // Save movie changes
  const handleSave = async () => {
    try {
      const updatedData = {
        name: name,
        genres: genres.split(',').map(genre => genre.trim()), // trim- remove spaces, clear
        an_image_url: imageUrl,
        year_premiered: premiered
      };

      await axios.put(`http://localhost:4000/movies/${id}`, updatedData);
      alert("Movie Edited")
      navigate(`/movies?username=${username}`); // Navigate back to all movies page after successful update
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };
  if (!movie) { // Check that the movie load before I return
    return null
  }
  return (
    <>
      <br />
      <div className="div-container-editMovie">
        <h1> Movies</h1> <br />
        <h1>Edit Movie: {movie.name}</h1> <br />
        Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> <br />
        Genres: <input type="text" value={genres} onChange={(e) => setGenres(e.target.value)} /> <br />
        Image Url: <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} /> <br />
        Premiered: <input type="text" value={premiered} onChange={(e) => setPremiered(e.target.value)} /> <br />
        <button onClick={handleSave}>Update</button>
        <button onClick={navigateToAllMovies}>Cancel</button>
      </div>
    </>
  );
};

export default EditMovie;
