import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useLocation} from 'react-router-dom';

/*
The “Watched Movies” section includes a list of links to the movies the member watched, and the date
he watched them. Is also have a button for subscribing to a new movie.
- A click on a movie link will redirect to “All Movies” page that present ONLY the selected movie.
- A click on “Subscribe on new movie” button will open a new section with a drop down with all
the movies he has not watched yet, and a date for watching it.
*/
const MovieSubscribersComponents = ({ movieId }) => {
  const [allSubscriptions, setAllSubscriptions] = useState([]);

  const URL_subscriptions = `http://localhost:4000/subscriptions/movieID/`;

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/subscriptions/movieID/${movieId}`); //  response.data
        setAllSubscriptions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setAllSubscriptions([]);
      }
    };

    fetchSubscriptions();
  }, [movieId]);

  const location = useLocation(); // Show username in URL 
  const params = new URLSearchParams(location.search); // Show username in URL 
  const username = params.get('username'); // Show username in URL 
  
  return (
    <ul>
      {/* empty: If there are no movies, add a message to add movies to watch */}
      {allSubscriptions.length > 0 ? (
        allSubscriptions.map((subscription, index) => (
          <li key={`${subscription.memberID}-${index}`}> {/* index- so that there is no duplicate key with the same name */}
            <Link to={`/subscriptions?username=${username}`}> {subscription.firstName} {subscription.lastName}</Link> ,{subscription.date}
          </li>
        ))
      ) : (<li>Please add a movie to the subscriptions</li>)
      }
    </ul>
  );
};

export default MovieSubscribersComponents;
