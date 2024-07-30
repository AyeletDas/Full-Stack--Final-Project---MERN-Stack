const Subscription = require('../models/subscriptionsModels');
// models -> Repo -> Service - > Controller - > index.js

// Get all subscriptions - http://localhost:4000/subscriptions
const getAllSubscriptions = async () => {
  try {
    return await Subscription.find({});
  } catch (error) {
    throw new Error('Failed to get subscriptions from database');
  }
};

// Get and find subscriptions by ID - http://localhost:4000/subscriptions/668e88ad02f2d713b02a9070
const getSubscriptionById = async (subscriptionId) => {
  try {
    return await Subscription.findById(subscriptionId);
  } catch (error) {
    throw new Error('Failed to get subscription from database');
  }
};

// Create a new subscription
const addSubscription = async (subscriptionData) => {
  try {
    const subscription = new Subscription(subscriptionData);
    return await subscription.save(); // save into the database. Returns the ID of the document I created
  } catch (error) {
    throw new Error('Failed to add subscription');
  }
};

// Update subscription by ID
const updateSubscription = async (subscriptionId, updatedData) => {
  try {
    return await Subscription.findByIdAndUpdate(subscriptionId, updatedData, { new: true }); //{ new: true } = new obj
  } catch (error) {
    throw new Error('Failed to update subscription');
  }
};

// Delete by ID 
const deleteSubscription = async (subscriptionId) => {
  try {
    await Subscription.findByIdAndDelete(subscriptionId);
  } catch (error) {
    throw new Error('Failed to delete subscription');
  }
};

// Get *subscription* by *member* ID - http://localhost:4000/subscriptions/memberID/668e87b502f2d713b02a9062
// According to member ID --> I show movie ID.
const searchSubscriptionsByMemberID = async (memberID) => {
  try {
    const subscriptions = await Subscription.find({ memberID: memberID });
    return subscriptions;
  } catch (error) {
    throw new Error('Failed to search subscriptions');
  }
};

// Get subscriptions by movie ID 
const searchSubscriptionsByMovieID = async (movieID) => {
  try {
    const subscriptions = await Subscription.find({ movieID: movieID });
    return subscriptions;
  } catch (error) {
    throw new Error('Failed to search subscriptions');
  }
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
  searchSubscriptionsByMemberID,
  searchSubscriptionsByMovieID
};
