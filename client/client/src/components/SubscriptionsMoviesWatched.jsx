import React, { useState, useEffect } from 'react';
import axios from 'axios';

/*
3 – “All Movies” Page:
  Present all movies in a list. Each movie has it’s name, year, image, “edit” & “delete” buttons, and a list of
  all the subscriptions that watched that movies (name + year)
  Each subscription name is a link.
*/
const SubscriptionsMoviesWatched = ({ member }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [allSubscriptions, setAllSubscription] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState('');
  const [watchDate, setWatchDate] = useState('');
  const [showSubscribeSection, setShowSubscribeSection] = useState(false); // showing/hiding subscribe

  const URL_subscriptions = `http://localhost:4000/subscriptions/memberID/`;
  const URL_movies = 'http://localhost:4000/movies';

  {/* List of movies to choose from */ } 
  useEffect(() => {
    const SubscriptionWatched = async () => {
      try {
        const moviesResp = await axios.get(URL_movies);
        setAllMovies(moviesResp.data || []); // || so that axios doesn't read an empty value

        const subsResp = await axios.get(`${URL_subscriptions}${member._id}`);
        if (subsResp.status === 200) {
          setAllSubscription(subsResp.data || []); // || so that axios doesn't read an empty value
        } else {
          setAllSubscription([]);
        }
      } catch (error) {
        console.error('Error get data:', error);
      }
    };

    SubscriptionWatched();
  }, [member._id]); 
  


  const handleSubscribe = async () => {
    try {
      const selectedMovieData = allMovies.find(movie => movie._id === selectedMovie);
      if (!selectedMovieData) { // so that axios doesn't read an empty value
        console.error('data not found'); 
        return; 
      }
      const newMoviesWatched = { 
        memberID: member._id, 
        movieID: selectedMovie, 
        name: selectedMovieData.name, 
        date: watchDate, 
      };

      const response = await axios.post('http://localhost:4000/subscriptions', newMoviesWatched);
      const newSubscription = {
        ...response.data,
        name: selectedMovieData.name, // data + movie name
      };

      setAllSubscription([...allSubscriptions, newSubscription]); // Add new movie to local state. Without the need to refresh the page
      alert('New movie subscription added');
    } catch (error) {
      console.error('Error in MoviesWatched:', error);
    }

    setSelectedMovie('');
    setWatchDate('');
    setShowSubscribeSection(false); // Hide subscribe section
  };

  const onSetSelectedMovie = (e) => {
    setSelectedMovie(e.target.value);
  };

  const SubscribeSection = () => {
    setShowSubscribeSection(!showSubscribeSection); // showing/hiding subscribe
  };

  return (
    <>
      <h3>Movies Watched</h3>
      <button onClick={SubscribeSection}>
        {showSubscribeSection ? 'Close Subscription' : 'Subscribe to new movie'}
      </button>
      <br />

      {/* showing/hiding subscribe */}
      {showSubscribeSection && (
        <div className='div-Add-A-new-Movie'>
          <h4>Add A new Movie</h4>
          <select value={selectedMovie} onChange={onSetSelectedMovie}>
            <option>Select a movie</option>
            {allMovies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.name}
              </option>
            ))}
          </select>

          {/* Choosing a date for the movie */}
          <input
            type="date"
            value={watchDate}
            onChange={(e) => setWatchDate(e.target.value)}
          />
          <br />
          <br />

          {/* Submit data button - sign up for the movie */}
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
      )}
      <ul>
        {allSubscriptions.map((subscription, index) => (
          <li key={`${subscription.movieID}-${index}`}> {/* index- so that there is no duplicate key with the same name */}
            {subscription.name}, {subscription.date}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SubscriptionsMoviesWatched;
