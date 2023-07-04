const { get } = require("http");
const { User, Thought } = require("../models");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const userData = await User.find({});
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getUserById(req, res) {
    try {
      const userData = await User
        .fineOne({ _id: req.params.userId })
        .populate("friends")
        .populate("thoughts");
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async postNewUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.status(201).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUserById(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
      }

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUserById(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId });

      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
      }

      await Thought.deleteMany({ _id: { $in: userData.thoughts } });
      res
        .status(204)
        .json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true }
      );
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};