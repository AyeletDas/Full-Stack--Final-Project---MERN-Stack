import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation = Show username in URL
import axios from 'axios'; // Adding a new movie to the data base - handleSave function

/*
  9 – “Add Member” Page -
    This page allows us to add a new member
    This page is visible only to users with the right permission
    - Click on “Save” button will create the new member
    - Click on “Cancel” button will redirect back to the “All Members” Page
*/
const AddMember = () => {
  const [fullName, setFullName] = useState('');
  const [firstName, lastName] = fullName.split(' ');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  const location = useLocation(); // Show username in URL 
  const params = new URLSearchParams(location.search); // Show username in URL
  const username = params.get('username'); // Show username in URL

  const navigate = useNavigate();

  const navigateToAllSubscriptions = () => {
    navigate(`/subscriptions?username=${username}`); // navigate and show username in URL
  };

  // Adding a new member to the database
  const handleSave = async () => {
    try {
      const newMember = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        city: city
      };

      const response = await axios.post('http://localhost:4000/members', newMember);
      console.log('New Member added:', response.data );
      alert("New Member added")

      // Redirect to all member page after successful save
      navigateToAllSubscriptions();
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  return (
    <div>
      <br />
      <div className="div-container-subscriptions">
        <h1>Subscriptions</h1>
        <div className="container">
          <button onClick={navigateToAllSubscriptions}>All Members</button>

          <button onClick={() => navigate(`/add/AddMember?username=${username}`)}>Add Member</button> <br /> <br />
        </div>
        <div className='subscriptions-container'>
          <h2>Add New Member</h2>
          Name: <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} /><br />
          Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
          City: <input type="text" value={city} onChange={(e) => setCity(e.target.value)} /><br /> <br />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => navigate(`/subscriptions?username=${username}`)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
