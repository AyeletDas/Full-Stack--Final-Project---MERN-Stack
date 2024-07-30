import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import MovieSubscribersComponents from '../components/MovieSubscribersComponents'
import { useDispatch, useSelector } from 'react-redux'; // redux 
import { doGetMovies, doRemoveMovie } from '../redux/actions'; // redux
const Movies = () => {

  /*
    2 – Movies Page :
      This page has a menu with 2 options:
        - “All Movies” (default) page
        - “Add Movie” page
  */

  const location = useLocation(); // Show username in URL 
  const params = new URLSearchParams(location.search); // Show username in URL 
  const username = params.get('username'); // Show username in URL 

  const navigate = useNavigate();

  const navigateToAddMovies = () => {
    navigate(`/add/AddMovie?username=${username}`);
  };

  const navigateToEditMovie = (id) => {
    navigate(`/edit/EditMovie/${id}?username=${username}`);
  };
  
  const dispatch = useDispatch(); // redux
  const movies = useSelector((state) => state.movies.movies); // redux

  const [search, setSearch] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [subscriptions, setSubscriptions] = useState({});


    useEffect(() => {
      const getMovies = async () => {
        try {
          const response = await axios.get('http://localhost:4000/movies');
          const movieData = response.data;
          dispatch(doGetMovies(movieData)); // redux
        } catch (error) {
          console.error('Error get movies:', error);
        }
      };
  
      getMovies();
    }, [dispatch]);
  
    useEffect(() => {
      setFilteredMovies(movies);
    }, [movies]);


  // Function to handle search 
  const handleSearch = () => {
    const searchLowerCase = search.toLowerCase();
    if (search.trim() === '') { // trim- remove spaces, clear
      setFilteredMovies(movies); // Reset filtered movies to show all movies
    } else {
      const filtered = movies.filter(movie =>
        movie.name.toLowerCase().includes(searchLowerCase)
      );
      setFilteredMovies(filtered);
    }
  };

  // Function to Delete movie 
    const handleDelete = async (id) => { 
      try {
        await axios.delete(`http://localhost:4000/movies/${id}`);
        dispatch(doRemoveMovie(id)); // redux
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    };

  useEffect(() => {
    const getSubscriptions = async (movieId) => {
      try {
        const response = await axios.get(`http://localhost:4000/subscriptions/${movieId}`);
        setSubscriptions(updateMoviePerMovieId => ({
          ...updateMoviePerMovieId,
          [movieId]: response.data
        }));
      } catch (error) {
        console.error('Error get subscriptions:', error);
      }
    };

    filteredMovies.forEach(movie => getSubscriptions(movie._id));
  }, [filteredMovies]);


  return (
    <>
      <div>
        <div className="container">
          <button onClick={() => setFilteredMovies(movies)}>All Movies</button>
          <button onClick={navigateToAddMovies}>Add Movies</button>
          Find Movie: <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button onClick={handleSearch}>Find</button>
        </div>
        <br />
        {filteredMovies.map((movie) => (
          <div key={movie._id} className="movie-container">
            <h2>{movie.name}, {movie.year_premiered}</h2>
            Genres: {movie.genres.join(" , ")} <br />

            <div>
              <img src={movie.an_image_url} alt={movie.name} />
              <div className="SubscriptionsMoviesWatched-container">
                <h4> Subscription watched: </h4>
                <MovieSubscribersComponents movieId={movie._id} />
              </div>

            </div>
            <br />
            <button onClick={() => navigateToEditMovie(movie._id)}>Edit</button>
            <button onClick={() => handleDelete(movie._id)}>Delete</button>

          </div>

        ))}
      </div>
    </>
  );
};

export default Movies;
