import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/*
  Links page for navigation (the routers page in the App.jsx file
*/
const Navbar = () => {
  const location = useLocation();  // Show username in URL 
  const params = new URLSearchParams(location.search);  // Show username in URL 
  const username = params.get('username');  // Show username in URL 

  return (
    <nav>
      <div className="links-Route">
        <Link to={`/movies?username=${username}`}>Movies</Link> <br />
        <Link to={`/subscriptions?username=${username}`}>Subscriptions</Link> <br />
        <Link to={'/log-out'}>Log Out</Link>
      </div>
      {username && <p>Welcome, {username} ♥ Good to see you !</p>}
      <br/>
    </nav>
  );
};

export default Navbar;
