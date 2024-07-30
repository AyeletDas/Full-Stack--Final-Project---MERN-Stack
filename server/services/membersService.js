const membersRepo = require('../repositories/membersRepo');
// models -> Repo -> Service - > Controller - > index.js

// Get all members - http://localhost:4000/members
const getAllMembers = async () => {
  try {
      const members = await membersRepo.getAllMembers();
      return members;
  } catch (error) {
      throw new Error('Failed to get members');
  }
};
// Get and find member by ID - http://localhost:4000/members/668e87b502f2d713b02a9062
const getMemberById = async (memberId) => {
  try {
    const member = await membersRepo.getMemberById(memberId);
    return member;
  } catch (error) {
    throw new Error('Failed to get member from database');
  }
};

// Create a new Members 
const addMember = async (obj) => {
try {
    const member = await membersRepo.addMember(obj); //שיצר לי ID תחזיר לי לאחר בקשת פוסט- רק את ה 
    return member._id; // החזרת ה-ID של הסרט שנוסף
} catch (error) {
    throw new Error('Failed to add member');
}
};

// Update a member by ID
const updateMember = async (memberId, updatedData) => {
try {
  const updatedMember = await membersRepo.updateMember(memberId, updatedData);
  return updatedMember;
} catch (error) {
  throw new Error('Failed to update member');
}
};

// Delete a member by ID
const deleteMember = async (memberId) => {
try {
  await membersRepo.deleteMember(memberId);
} catch (error) {
  throw new Error('Failed to delete member');
}
};

// Search member by first name - http://localhost:4000/members/search/Dana (# currently not used in this project)
const searchMemberByName = async (firstName) => {
  try {
    const member = await membersRepo.searchMemberByName(firstName);
    return member;
  } catch (error) {
    throw new Error('Failed to search member');
  }
};

module.exports = { getAllMembers, getMemberById, addMember, updateMember, deleteMember, searchMemberByName };
