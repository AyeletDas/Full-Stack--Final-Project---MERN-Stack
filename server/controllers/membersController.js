const express = require('express');
const membersService = require('../services/membersService');
const router = express.Router();
// models -> Repo -> Service - > Controller - > index.js

// Get all members - http://localhost:4000/members
router.get('/', async (req, res) => {
  try {
    const members = await membersService.getAllMembers();
    res.status(200).json(members); // .json - also treat on NULL (and .send no)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get members' });
  }
});

// Get and find member by ID - http://localhost:4000/members/668e87b502f2d713b02a9062
router.get('/:id', async (req, res) => {
  try {
    const Members = await membersService.getMemberById(req.params.id);
    if (!Members) { // If member is not found with the ID in the sent request.
      return res.status(404).json({ error: 'Members not found' });
    }
    res.status(200).json(Members);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get Members' });
  }
});

// Create a new Members 
router.post('/', async (req, res) => {
  try {
    const newMembers = await membersService.addMember(req.body);
    res.status(201).json(newMembers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Member by ID 
router.put('/:id', async (req, res) => {
  try {
    const memberId = req.params.id;
    const updatedMember = await membersService.updateMember(memberId, req.body);
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete member by ID
router.delete('/:id', async (req, res) => {
  try {
    const memberId = req.params.id;
    await membersService.deleteMember(memberId);
    res.status(204).end(); // Or res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search member by first name - http://localhost:4000/members/search/Dana (# currently not used in this project)
router.get('/search/:firstName', async (req, res) => {
  try {
    const { firstName } = req.params;
    const member = await membersService.searchMemberByName(firstName);
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search member' });
  }
});

module.exports = router;
