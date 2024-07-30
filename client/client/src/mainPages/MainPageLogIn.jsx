import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

/*
1 – Login Page:
  The home page of the system. A page with username & password text box and a “Login” button. A
  successful log in redirect to “Main” Page. A failed attempt will present a proper message in the same
  page (Login page).
  Once a user logged in – his name will be presented in all the site pages
*/
function LogIn() {
  const navigate = useNavigate(); 
  const location = useLocation(); // Show username in URL 
  const params = new URLSearchParams(location.search); // Show username in URL 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/users/login', { username, password });
      navigate(`/movies?username=${response.data.username}`);
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Invalid username or password');
    }
  };
  

  return (
    <>
      <h1>Log In Page</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      User Name: <input type='text' value={username} onChange={handleUserNameChange} /> <br />
      Password: <input type='password' value={password} onChange={handlePasswordChange} /> <br />
      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default LogIn;
