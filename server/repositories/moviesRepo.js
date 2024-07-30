const Movie = require('../models/moviesModels');
// models -> Repo -> Service - > Controller - > index.js

// Get all movies - http://localhost:4000/movies
const getAllMovies = async () => {
  try {
    return await Movie.find({});
  } catch (error) {
    throw new Error('Failed to get movie from database');
  }
};

// GET movie by ID - http://localhost:4000/movies/668baa69db0df40b53e11aea
const getMovieById = async (movieId) => {
  try {
    const movie = await Movie.findById(movieId);
    return movie;
  } catch (error) {
    throw new Error('Failed to get movie from database');
  }
};

// Create a new movie
const addMovie = (obj) => {
  const movie = new Movie(obj); // obj= Creating a structure of the document using this model. String will become a Number
  return movie.save(); // save into the database. Returns the ID of the document I created
};

// Update a movie by ID
const updateMovie = async (movieId, updatedData) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, updatedData, { new: true }); //{ new: true } = new obj
    return updatedMovie;
  } catch (error) {
    throw new Error('Failed to update movie in database');
  }
};

// Delete a movie by ID
const deleteMovie = async (movieId) => {
  try {
    await Movie.findByIdAndDelete(movieId);
  } catch (error) {
    throw new Error('Failed to delete movie from database');
  }
};

// Search movies by name - http://localhost:4000/movies/search/Arrow
const searchMoviesByName = async (name) => {
  try {
    const movies = await Movie.find({ name: name });
    return movies;
  } catch (error) {
    throw new Error('Failed to search movies');
  }
};

module.exports = { addMovie , getAllMovies, getMovieById, updateMovie, deleteMovie, searchMoviesByName};




