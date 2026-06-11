const { TripNote, Trip, Stop } = require('../models');

// Get all notes for a trip
exports.getNotes = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    
    const notes = await TripNote.findAll({
      where: { trip_id: tripId },
      include: [{ model: Stop, as: 'stop' }],
      order: [['created_at', 'DESC']]
    });
    
    res.json({ success: true, data: notes });
  } catch (error) {
    next(error);
  }
};

// Add note to trip
exports.addNote = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const { content, stop_id } = req.body;
    
    const note = await TripNote.create({
      trip_id: tripId,
      stop_id: stop_id || null,
      content
    });
    
    const createdNote = await TripNote.findByPk(note.id, {
      include: [{ model: Stop, as: 'stop' }]
    });
    
    res.status(201).json({ success: true, data: createdNote, message: 'Note added successfully' });
  } catch (error) {
    next(error);
  }
};

// Update note
exports.updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { content } = req.body;
    
    const note = await TripNote.findByPk(noteId);
    if (!note) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }
    
    note.content = content;
    await note.save();
    
    const updatedNote = await TripNote.findByPk(noteId, {
      include: [{ model: Stop, as: 'stop' }]
    });
    
    res.json({ success: true, data: updatedNote, message: 'Note updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Delete note
exports.deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    
    const note = await TripNote.findByPk(noteId);
    if (!note) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }
    
    await note.destroy();
    
    res.json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    next(error);
  }
};
