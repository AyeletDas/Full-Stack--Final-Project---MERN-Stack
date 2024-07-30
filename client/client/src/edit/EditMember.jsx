import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';  // useLocation = Show username in URL

/*
8 – “Edit Member” Page:
This page allows us to edit the member’s data
- Click on “Update” button will update the member’s data
- Click on “Delete” button will redirect back to the “All Members” Page
*/
const EditMember = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const location = useLocation(); // Show username in URL 
  const params = new URLSearchParams(location.search); // Show username in URL 
  const username = params.get('username'); // Show username in URL 

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Update firstName and lastName when fullName changes
  useEffect(() => {
    const getMember = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/members/${id}`);
        const memberData = response.data;
        setFirstName(memberData.firstName);
        setLastName(memberData.lastName);
        setFullName(`${memberData.firstName} ${memberData.lastName}`);
        setEmail(memberData.email);
        setCity(memberData.city);
      } catch (error) {
        console.error('Error get member:', error);
      }
    };

    getMember();
  }, [id]);

  const handleSave = async () => {
    try {
      const updatedMember = {
        firstName,
        lastName,
        email,
        city,
      };

      await axios.put(`http://localhost:4000/members/${id}`, updatedMember);
      alert('Member updated successfully');
      navigate(`/subscriptions?username=${username}`);
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  const handleFullNameChange = (e) => { // firstName + lastName in one line
    const [first, ...last] = e.target.value.split(' ');
    setFirstName(first || '');
    setLastName(last.join(' ') || '');
    setFullName(e.target.value);
  };

  const navigateToAllMembers = () => {
    navigate(`/subscriptions?username=${username}`);
  };

  return (
    <>
      <br />
      <div className="div-container-editMovie">
        <h1>Edit Member</h1> <br />
        Full Name: <input type="text" value={fullName} onChange={handleFullNameChange}></input>  <br />
        Email <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
        City <input type="text" value={city} onChange={(e) => setCity(e.target.value)} /> <br />
        <button onClick={handleSave}>Update</button>
        <button onClick={navigateToAllMembers}>Cancel</button>
      </div>
    </>
  );
};

export default EditMember;
