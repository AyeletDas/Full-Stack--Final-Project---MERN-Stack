const Member = require('../models/membersModels');
// models -> Repo -> Service - > Controller - > index.js

// Get all members - http://localhost:4000/members
const getAllMembers = async () => {
  try {
    return await Member.find({});
  } catch (error) {
    throw new Error('Failed to get member from database');
  }
};

// Get and find member by ID - http://localhost:4000/members/668e87b502f2d713b02a9062
const getMemberById = async (memberId) => {
  try {
    return await Member.findById(memberId);
  } catch (error) {
    throw new Error('Failed to get member from database');
  }
};

// Create a new member 
const addMember = (obj) => {
  const member = new Member(obj); // obj= Creating a structure of the document using this model. String will become a Number
  return member.save(); // save into the database. Returns the ID of the document I created
};

// Update member by ID 
const updateMember = async (memberId, updatedData) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(memberId, updatedData, { new: true }); //{ new: true } = new obj
    return updatedMember;
  } catch (error) {
    throw new Error('Failed to update Member in database');
  }
};

// Delete member by ID
const deleteMember = async (memberId) => {
  try {
    await Member.findByIdAndDelete(memberId);
  } catch (error) {
    throw new Error('Failed to delete member');
  }
};

// Search member by first name - http://localhost:4000/members/search/Dana (# currently not used in this project)
const searchMemberByName = async (firstName) => {
  try {
    const member = await Member.find({ firstName: firstName });
    return member;
  } catch (error) {
    throw new Error('Failed to search member');
  }
};

module.exports = {getAllMembers, getMemberById, addMember, updateMember,deleteMember , searchMemberByName };
