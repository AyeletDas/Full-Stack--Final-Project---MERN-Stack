import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import LogIn from './mainPages/MainPageLogIn';
import Movies from './mainPages/Movies';
import Subscriptions from './mainPages/Subscriptions';
import LogOut from './mainPages/LogOut';

import AddMovie from './add/AddMovie';
import AddMember from './add/AddMember';

import EditMovie from './edit/EditMovie';
import EditMember from './edit/EditMember';

import './App.css';

import Navbar from './components/Navbar' // for Links

const App = () => {
  const location = useLocation(); // Navbar
  const params = new URLSearchParams(location.search); // Navbar
  const username = params.get('username'); // Navbar

  const isLoginPage = location.pathname === '/'; // The links appear only if it is not the main login page

  return (
    <div className='background-color-all-page'>
      <h1>Movies - Subscription Web Site</h1>

      {!isLoginPage && <Navbar />} {/* The links appear only if it is not the main login page */}

      <Routes>
        <Route path='/' element={<LogIn/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/subscriptions' element={<Subscriptions/>}/>
        <Route path='/log-Out' element={<LogOut/>}/>
        <Route path="/add/AddMovie" element={<AddMovie username={username}/>} />
        <Route path="/add/AddMember" element={<AddMember username={username}/>} />
        <Route path="/edit/EditMovie/:id" element={<EditMovie username={username}/>} />
        <Route path="/edit/EditMember/:id" element={<EditMember username={username}/>} />
      </Routes>
    </div>
  );
};

export default App;
