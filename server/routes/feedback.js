import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// POST feedback
router.post('/create', async (req, res) => {
  const { name, comment } = req.body;
  try {
    const newFeedback = new Feedback({ name, comment });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving feedback' });
  }
});

// GET feedbacks
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching feedbacks' });
  }
});

export default router;
