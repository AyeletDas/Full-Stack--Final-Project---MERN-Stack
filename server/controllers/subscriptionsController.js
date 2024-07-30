const express = require('express');
const subscriptionService = require('../services/subscriptionsService');
const router = express.Router();
// models -> Repo -> Service - > Controller - > index.js

// Get all subscriptions - http://localhost:4000/subscriptions
router.get('/', async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getAllSubscriptions();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get subscriptions' });
  }
});

// Get and find subscriptions by ID - http://localhost:4000/subscriptions/668e88ad02f2d713b02a9070
router.get('/:id', async (req, res) => {
  try {
    const subscription = await subscriptionService.getSubscriptionById(req.params.id);
    if (!subscription) {  // If subscription is not found with the ID in the sent request.
      return res.status(200).json({ message: 'Subscription not found' });
    }
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get subscription' });
  }
});

// Create a new subscription
router.post('/', async (req, res) => {
  try {
    const newSubscription = await subscriptionService.addSubscription(req.body);
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add subscription' });
  }
});

// Update subscription by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSubscription = await subscriptionService.updateSubscription(req.params.id, req.body);
    res.status(200).json(updatedSubscription);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update subscription' });
  }
});

// Delete by ID
router.delete('/:id', async (req, res) => {
  try {
    await subscriptionService.deleteSubscription(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete subscription' });
  }
});

// Get *subscription* by *member* ID - http://localhost:4000/subscriptions/memberID/668e873902f2d713b02a9060
// According to member ID --> I show movie ID.
router.get('/memberID/:memberID', async (req, res) => {
  const { memberID } = req.params; // req.params - memberID/:id' || req.query - /memberID?memberID=avi&id=101010
  try {
    const movieDetails = await subscriptionService.getSubscriptionByMemberIDandThenGetMovieById(memberID);
    if (!movieDetails || movieDetails.length === 0) { // Checks if not empty || null || undefined value
       return res.status(404).json({ error: 'Subscription not found' });
    }
    res.status(200).json(movieDetails);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get subscription' });
  }
});

// Get *subscriptions* by *movie* ID - http://localhost:4000/subscriptions/movieID/668baab9db0df40b53e11aeb
// According to movie ID --> I show member ID.
router.get('/movieID/:movieID', async (req, res) => {
  const { movieID } = req.params;
  try {
    const memberDetails = await subscriptionService.getSubscriptionsByMovieIDandThenGetMemberById(movieID);
    if (!memberDetails || memberDetails.length === 0) { // Checks if not empty || null || undefined value
      return res.status(200).json({ message: 'No members found for this movie.' });
    }
    res.status(200).json(memberDetails);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get subscriptions' });
  }
});

module.exports = router;
