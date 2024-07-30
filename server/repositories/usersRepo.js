const User = require('../models/usersModels');
// models -> Repo -> Service - > Controller - > index.js

// GET all users - http://localhost:4000/users
const getAllUsers = async () => {
  try {
    return await User.find({});
  } catch (error) {
    throw new Error('Failed to get User from database');
  }
};

// Get and find user by ID - http://localhost:4000/users/668ab0f9bbab40096e35d094
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error('Failed to get user from database');
  }
};

// Create a new user
const addUser = (obj) => {
  const per = new User(obj); // obj= Creating a structure of the document using this model. String will become a Number
  return per.save(); // save into the database. Returns the ID of the document I created
};

// Update a user by ID
const updateUser = async (userId, updatedData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }); //{ new: true } = new obj
    return updatedUser;
  } catch (error) {
    throw new Error('Failed to update user in database');
  }
};

// Delete a user by ID
const deleteUser = async (userId) => {
  try {
    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error('Failed to delete user from database');
  }
};

// Create a user
const getFullDataForlogin = async (username, password) => {
  try {
    const user = await User.findOne({ username, password }); // A single document in the collection. Returns the first one
    return user;
  } catch (error) {
    throw new Error('Failed to get user from database');
  }
};

// Search users by username - http://localhost:4000/users/search/israeli
const searchUsersByName = async (username) => {
  try {
    const users = await User.find({ username: username });
    return users;
  } catch (error) {
    throw new Error('Failed to search users');
  }
};

module.exports = { addUser, getAllUsers, getUserById, updateUser, deleteUser, getFullDataForlogin, searchUsersByName };
