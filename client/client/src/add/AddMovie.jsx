import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation = Show username in URL
import axios from 'axios'; // Adding a new movie to the data base - handleSave function

/*
    4 – “Add Movie” Page:
        This page allows to create a new movie
        - A click on “Save” button will save the new data in the DB
        - A click on “Cancel” button will redirect to the “All Movies” page
*/
const AddMovie = () => {
    const [name, setName] = useState('');
    const [genres, setGenres] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [premiered, setPremiered] = useState('');

    const location = useLocation(); // Show username in URL 
    const params = new URLSearchParams(location.search); // Show username in URL
    const username = params.get('username'); // Show username in URL

    const navigate = useNavigate();

    const navigateToAllMovies = () => {
        navigate(`/movies?username=${username}`);
    };

    const navigateToAddMovies = () => {
        navigate(`/add/AddMovie?username=${username}`);
    };

    // Adding a new movie to the database
    const handleSave = async () => {
        try {
            const newMovie = {
                name: name,
                genres: genres.split(',').map(genre => genre.trim()),
                an_image_url: imageUrl,
                year_premiered: premiered
            };

            const response = await axios.post('http://localhost:4000/movies', newMovie);
            alert("New movie added")

            // Redirect to all movies page after successful save
            navigateToAllMovies();
        } catch (error) {
            console.error('Error saving movie:', error);
        }
    };

    return (
        <>
            <h1>Movies</h1>
            <button onClick={navigateToAllMovies}>All Movies</button>
            <button onClick={navigateToAddMovies}>Add Movies</button> <br /> <br />
            <div>
                Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> <br />
                Genres: <input type="text" value={genres} onChange={(e) => setGenres(e.target.value)} />  <br />
                Image Url: <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} /> <br />
                Premiered: <input type="" value={premiered} onChange={(e) => setPremiered(e.target.value)} /> <br />
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={navigateToAllMovies}>Cancel</button>
        </>
    );
};

export default AddMovie;
