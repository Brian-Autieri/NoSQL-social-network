const { User, Thought } = require("../models");

// Left off here

module.exports = {
  async createNewThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);
      const userData = await User.findOneAndUpdate(
        { username: thoughtData.username },
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );
      if (!userData) {
        res
          .status(404)
          .json({ message: "Thought created but no user found with that id!" });
      }
      res.status(201).json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.find({});
      res.status(200).json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getThoughtById(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
      res.status(200).json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThoughtById(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
      }
      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThoughtById(req, res) {
    try {
      const thoughtData = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
      }
      res.json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
        }
  },

  async createNewReaction(req, res) {
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!reactionData) {
        res.status(404).json({ message: "No thought found with this id!" });
      }
      res.status(201).json(reactionData);
    } catch (err) {
        res.status(500).json(err);
        }
  },

  async deleteReactionById(req, res) {
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!reactionData) {
        res.status(404).json({ message: "No thought found with this id!" });
      }
      res.json(reactionData);
    } catch (err) {
        res.status(500).json(err);
        }
  },
};
