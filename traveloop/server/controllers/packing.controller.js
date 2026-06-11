const { PackingItem, Trip } = require('../models');

// Get all packing items for a trip
exports.getPackingItems = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    
    const items = await PackingItem.findAll({
      where: { trip_id: tripId },
      order: [['category', 'ASC'], ['name', 'ASC']]
    });
    
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

// Add packing item
exports.addPackingItem = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const { name, category = 'other' } = req.body;
    
    const item = await PackingItem.create({
      trip_id: tripId,
      name,
      category
    });
    
    res.status(201).json({ success: true, data: item, message: 'Item added successfully' });
  } catch (error) {
    next(error);
  }
};

// Update packing item
exports.updatePackingItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { name, category, is_packed } = req.body;
    
    const item = await PackingItem.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }
    
    if (name !== undefined) item.name = name;
    if (category !== undefined) item.category = category;
    if (is_packed !== undefined) item.is_packed = is_packed;
    
    await item.save();
    
    res.json({ success: true, data: item, message: 'Item updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Delete packing item
exports.deletePackingItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    
    const item = await PackingItem.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }
    
    await item.destroy();
    
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Reset packing list (uncheck all)
exports.resetPackingList = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    
    await PackingItem.update(
      { is_packed: false },
      { where: { trip_id: tripId } }
    );
    
    const items = await PackingItem.findAll({
      where: { trip_id: tripId },
      order: [['category', 'ASC'], ['name', 'ASC']]
    });
    
    res.json({ success: true, data: items, message: 'Packing list reset successfully' });
  } catch (error) {
    next(error);
  }
};
