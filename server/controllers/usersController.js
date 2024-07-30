const express = require('express');
const userService = require('../services/usersService');
const router = express.Router();
// models -> Repo -> Service - > Controller - > index.js

// GET all users - http://localhost:4000/users
router.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users' });
  }
});

// Get and find user by ID - http://localhost:4000/users/668ab0f9bbab40096e35d094
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) { // If subscription is not found with the ID in the sent request.
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const result = await userService.addUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error to get user:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await userService.updateUser(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await userService.deleteUser(userId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Find user by username and password - Main path for entering username and password
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userService.getFullDataForlogin(username, password);
    if (user) { // if Succeeded:
      res.status(200).json(user); // Succeeded search - returns JSON
    } else {
      res.status(404).json({ error: 'User not found' });  // not succeeded search - returns status
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' });  // error in search - return error service
  }
});

// Search users by username - http://localhost:4000/users/search/israeli
router.get('/search/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const users = await userService.searchUsersByName(username);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search users' });
  }
});

module.exports = router;
