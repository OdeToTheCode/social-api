const {Thought, User } = require('../models');

const ThoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  },

  getOneThought: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId).select('-__v');
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  },

  createThought: async (req, res) => {
    const { thoughtText } = req.body;
    try {
      const user = await User.findById(req.user.id).select('-password');
      const newThought = new Thought({
        thoughtText,
        username: user.username,
        userId: user._id,
      });
      const savedThought = await newThought.save();
      res.json(savedThought);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  },

  updateThought: async (req, res) => {
    const { thoughtText } = req.body;
    try {
      let thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      if (thought.userId.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }
      thought.thoughtText = thoughtText;
      await thought.save();
      res.json(thought);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  },

  deleteThought: async (req, res) => {
    try {
      let thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      if (thought.userId.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }
      await thought.remove();
      res.json({ message: 'Thought deleted' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  },

  addReaction: async (req, res) => {
    const { reactionBody } = req.body;
    try {
      const user = await User.findById(req.user.id).select('-password');
      let thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      const newReaction = {
        username: user.username,
        userId: user._id,
        reactionBody,
      };
      thought.reactions.unshift(newReaction);
      await thought.save();
      res.json(thought);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }},
      
    async removeReaction(req, res) {
        try {
        const thoughtId = req.params.thoughtId;
        const reactionId = req.params.reactionId;
    
        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { _id: reactionId } } },
            { new: true }
        );
    
        if (!updatedThought) {
            res.status(404).json({ message: 'No matching ID' });
            return;
        }
    
        res.json(updatedThought);
        } catch (err) {
        console.log(err);
        res.status(500).json(err);
        }
    },
    };
    
    module.exports = ThoughtController;
      