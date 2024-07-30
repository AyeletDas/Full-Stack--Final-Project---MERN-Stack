import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import MoviesWatched from '../components/SubscriptionsMoviesWatched';
import { useDispatch, useSelector } from 'react-redux'; // redux
import { doGetSubscriptions, doRemoveSubscription } from '../redux/actions'; // redux
/*
6 – “Subscriptions” Page:
    This page manages all the members and their movies subscriptions
    This page has a menu with 2 options:
    - All Members (Default) – present “All Memebers” page
    - Add Member – present “Add Member” page

    7 – “All Members” Page:
    This page presents all the members and their movies they watched (subscribed to)
    - Click on the “edit” button will redirect to “Edit Member” page
    - Click on “Delete” button will delete all the user’s data (including the relevant data from the
    movies data sources)
*/


const Subscriptions = () => {
    const dispatch = useDispatch(); // redux
    const filteredMembers  = useSelector((state) => state.subscriptions.subscriptions); // redux

    useEffect(() => {
        const getSubscriptions = async () => {
            try {
                const response = await axios.get('http://localhost:4000/members');
                dispatch(doGetSubscriptions(response.data)); // redux
            } catch (error) {
                console.error('Error get subscriptions:', error);
            }
        };

        getSubscriptions();
    }, [dispatch]);

    const location = useLocation();  // Show username in URL 
    const params = new URLSearchParams(location.search);  // Show username in URL 
    const username = params.get('username');  // Show username in URL 

    const navigate = useNavigate();

    const navigateToEditMember = (id) => {
        navigate(`/edit/EditMember/${id}?username=${username}`); 
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/members/${id}`);
            dispatch(doRemoveSubscription(id));  // redux
        } catch (error) {
            console.error('Error deleting member:', error);
        }
    };

    const navigateToAddMember = () => {
        navigate(`/add/AddMember?username=${username}`);
    };


    return (
        <>
            <br />
            <div className="div-container-subscriptions">
                <h1>Subscriptions</h1>
                <div className="container">
                    <button onClick={() => navigate(`/subscriptions?username=${username}`)}>All Members</button>
                    <button onClick={navigateToAddMember}>Add Member</button> <br /> <br />
                </div>
                <br />
                {filteredMembers.map((member) => (
                    <div key={member._id} className='subscriptions-container'>
                        <h2>{member.firstName} {member.lastName}</h2>
                        Email: {member.email} <br />
                        City: {member.city} <br />
                        <button onClick={() => navigateToEditMember(member._id)}>Edit</button>
                        <button onClick={() => handleDelete(member._id)}>Delete</button> <br /> <br />
                        <div className="div-Movies-Watched">
                            <MoviesWatched member={member} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Subscriptions;
