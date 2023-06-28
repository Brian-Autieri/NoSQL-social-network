const { User, Thought } = require('../models');

module.exports = {
    async createNewThought(req, res) {
        try {
            const thoughtData = await thought.create(req.body);
            const userData = await user.findOneAndUpdate(
                { username: thoughtData.username },
                { $push: { thoughts: thoughtData._id } },
                { new: true}
            );
            if (!userData) {
                res.status(404).json({ message: 'Thought created but no user found with that id!' });
            }
            res.status(201).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};