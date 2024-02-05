const { User, Thought } = require('../models');

const checkUser = (user) => {
    if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
    };
};

module.exports = {

    async getAllUsers(req, res) {
        try {
            const users = await User.find(); 
            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate("thoughts")
                .populate("friends")
                .select("-__v");
    
            checkUser(user);
    
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            checkUser(user);
    
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
    
            checkUser(user);

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
    
            res.json({ message: 'User and their thoughts deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            checkUser(user);
    
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            checkUser(user);
    
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
};