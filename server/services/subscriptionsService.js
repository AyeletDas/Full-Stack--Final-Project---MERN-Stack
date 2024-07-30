const subscriptionsRepo = require('../repositories/subscriptionsRepo');
const moviesService = require('../services/moviesService');  // for function to get memberID
const membersService = require('../services/membersService');  // for function to get movieID 
// models -> Repo -> Service - > Controller - > index.js

// Get all subscriptions - http://localhost:4000/subscriptions
const getAllSubscriptions = async () => {
  try {
    return await subscriptionsRepo.getAllSubscriptions();
  } catch (error) {
    throw new Error('Failed to get subscriptions');
  }
};

// Get and find subscriptions by ID - http://localhost:4000/subscriptions/668e88ad02f2d713b02a9070
const getSubscriptionById = async (subscriptionId) => {
  try {
    return await subscriptionsRepo.getSubscriptionById(subscriptionId);
  } catch (error) {
    throw new Error('Failed to get subscription');
  }
};

// Create a new subscription
const addSubscription = async (subscriptionData) => {
  try {
    return await subscriptionsRepo.addSubscription(subscriptionData);
  } catch (error) {
    throw new Error('Failed to add subscription');
  }
};

// Update subscription by ID
const updateSubscription = async (subscriptionId, updatedData) => {
  try {
    return await subscriptionsRepo.updateSubscription(subscriptionId, updatedData);
  } catch (error) {
    throw new Error('Failed to update subscription');
  }
};

// Delete by ID 
const deleteSubscription = async (subscriptionId) => {
  try {
    return await subscriptionsRepo.deleteSubscription(subscriptionId);
  } catch (error) {
    throw new Error('Failed to delete subscription');
  }
};

// Get *subscription* by *member* ID - http://localhost:4000/subscriptions/memberID/668e873902f2d713b02a9060
// Promise.all: I am waiting for all the promises finished (because I'm taking from 2 sources at the same time: subscriptions and movies)
const getSubscriptionByMemberIDandThenGetMovieById = async (memberID) => {
  try {
    const subscriptions = await subscriptionsRepo.searchSubscriptionsByMemberID(memberID); // find all the member's subscriptions by memberID
    const movieDetails = await Promise.all(subscriptions.map(async (subscription) => { // If one of the promises is rejected, the code does not continue.
      const movie = await moviesService.getMovieById(subscription.movieID); // find all the movie's subscriptions by movieID
      if (!movie) {
        return null;
      }
      return {
        ...movie.toObject(), // Just the raw data
        date: subscription.date, // Add a new field - date (to each movie object)
      };
    }));
    return movieDetails.filter(detail => detail !== null); // Filter out null values
    // returns movies watched list and dates 
  } catch (error) {
    throw new Error('Failed to get subscription');
  }
};

// Get *subscription* by *movie* ID - http://localhost:4000/subscriptions/movieID/668baab9db0df40b53e11aeb
const getSubscriptionsByMovieIDandThenGetMemberById = async (movieID) => {
  try {
    const subscriptions = await subscriptionsRepo.searchSubscriptionsByMovieID(movieID);
    const memberDetails = await Promise.all(subscriptions.map(async (subscription) => {
      const member = await membersService.getMemberById(subscription.memberID);
      if (!member) { // If the member is not found
        return null; // return null object
      }
      const movie = await moviesService.getMovieById(subscription.movieID);
      if (!movie) {
        return null;
      }
      return {
        ...movie.toObject(),
        ...member.toObject(),
        date: subscription.date,
      };
    }));
    return memberDetails.filter(detail => detail !== null); // If a member is not found, it will not be included in the final result
  } catch (error) {
    console.error('Error in route handler /memberID/:memberID:', error);
    throw new Error('Failed to get subscriptions');
  }
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
  getSubscriptionByMemberIDandThenGetMovieById,
  getSubscriptionsByMovieIDandThenGetMemberById
};
