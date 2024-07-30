const express = require('express');
const moviesService = require('../services/moviesService');
const router = express.Router();
// models -> Repo -> Service - > Controller - > index.js

// GET all movies - http://localhost:4000/movies
router.get('/', async (req, res) => {
    try {
        const movies = await moviesService.getAllMovies();
        res.status(200).json(movies); // .json - also treat on NULL (and .send no)
    } catch (error) {
        res.status(500).json({ error: 'Failed to get movies' });
    }
});

// Get and find Movie by ID - http://localhost:4000/movies/668baa69db0df40b53e11aea
router.get('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await moviesService.getMovieById(movieId);
        if (!movie) { // If movie is not found with the ID in the sent request.
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get movie' });
    }
});

// Create a new movie
router.post('/', async (req, res) => {
    try {
        const result = await moviesService.addMovie(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a movie by ID
router.put('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const updatedMovie = await moviesService.updateMovie(movieId, req.body);
        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a movie by ID 
router.delete('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        await moviesService.deleteMovie(movieId);
        res.status(204).end(); // Or res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Search movies by name - http://localhost:4000/movies/search/Arrow
router.get('/search/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const movies = await moviesService.searchMoviesByName(name);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search movies' });
    }
});


module.exports = router;
