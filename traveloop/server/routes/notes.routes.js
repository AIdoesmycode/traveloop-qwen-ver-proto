const express = require('express');
const router = express.Router();
const {
  getNotes,
  addNote,
  updateNote,
  deleteNote
} = require('../controllers/notes.controller');
const authMiddleware = require('../middleware/auth.middleware');

// All notes routes require authentication
router.use(authMiddleware);

// GET /api/notes/trip/:tripId - Get all notes for a trip
router.get('/trip/:tripId', getNotes);

// POST /api/notes/trip/:tripId - Add note to trip
router.post('/trip/:tripId', addNote);

// PUT /api/notes/:noteId - Update note
router.put('/:noteId', updateNote);

// DELETE /api/notes/:noteId - Delete note
router.delete('/:noteId', deleteNote);

module.exports = router;
