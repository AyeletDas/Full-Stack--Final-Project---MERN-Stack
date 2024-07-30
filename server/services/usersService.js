const userRepo = require('../repositories/usersRepo');
// models -> Repo -> Service - > Controller - > index.js

// GET all users - http://localhost:4000/users
const getAllUsers = async () => {
    try {
      const users = await userRepo.getAllUsers();
      return users;
    } catch (error) {
      throw new Error('Failed to get users');
    }
  };
// Get and find user by ID - http://localhost:4000/users/668ab0f9bbab40096e35d094
const getUserById = async (userId) => {
  try {
    const user = await userRepo.getUserById(userId);
    return user;
  } catch (error) {
    throw new Error('Failed to get user from database');
  }
};

// Create a new user
const addUser = async (obj) => {
  try {
    const { _id: userId } = await userRepo.addUser(obj); // after a post request - only the ID created return
    return userId;
  } catch (error) {
    throw new Error('Failed to add user');
  }
};

// Update a user by ID
const updateUser = async (userId, updatedData) => {
  try {
    const updatedUser = await userRepo.updateUser(userId, updatedData);
    return updatedUser;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

// Delete a user by ID
const deleteUser = async (userId) => {
  try {
    await userRepo.deleteUser(userId);
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};

// Find user by username and password - Main path for entering username and password
const getFullDataForlogin = async (username, password) => {
  try {
    const user = await userRepo.getFullDataForlogin(username, password);
    return user;
  } catch (error) {
    throw new Error('Failed to get user from database');
  }
};

// Search users by username - http://localhost:4000/users/search/israeli
const searchUsersByName = async (username) => {
  try {
    const users = await userRepo.searchUsersByName(username);
    return users;
  } catch (error) {
    throw new Error('Failed to search users');
  }
};

module.exports = { addUser , getAllUsers, getUserById, updateUser, deleteUser, getFullDataForlogin, searchUsersByName };

