const movieRepo = require('../repositories/moviesRepo');
// models -> Repo -> Service - > Controller - > index.js

// GET all movies - http://localhost:4000/movies
const getAllMovies = async () => {
    try {
        const movies = await movieRepo.getAllMovies();
        return movies;
    } catch (error) {
        throw new Error('Failed to get movies');
    }
};

// Get and find Movie by ID - http://localhost:4000/movies/668baa69db0df40b53e11aea
const getMovieById = async (movieId) => {
    try {
      const movie = await movieRepo.getMovieById(movieId);
      return movie;
    } catch (error) {
      throw new Error('Failed to get movie from database');
    }
  };

// Create a new movie
const addMovie = async (obj) => {
  try {
      const movie = await movieRepo.addMovie(obj); // after a post request - return only the ID created
      return movie._id;
  } catch (error) {
      throw new Error('Failed to add movie');
  }
};

// Update a movie by ID
const updateMovie = async (movieId, updatedData) => {
  try {
    const updatedMovie = await movieRepo.updateMovie(movieId, updatedData);
    return updatedMovie;
  } catch (error) {
    throw new Error('Failed to update movie');
  }
};

// Delete a movie by ID
const deleteMovie = async (movieId) => {
  try {
    await movieRepo.deleteMovie(movieId);
  } catch (error) {
    throw new Error('Failed to delete movie');
  }
};

// Search movies by name - http://localhost:4000/movies/search/Arrow
const searchMoviesByName = async (name) => {
  try {
    const movies = await movieRepo.searchMoviesByName(name);
    return movies;
  } catch (error) {
    throw new Error('Failed to search movies');
  }
};

module.exports = { addMovie, getAllMovies, getMovieById, updateMovie, deleteMovie, searchMoviesByName };

