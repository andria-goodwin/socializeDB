const { User, Thought } = require('../models');

// check if thought id exists, if not throw 404
const checkThought = (thought) => {
    if (!thought) {
        return res.status(404).json({ message: 'No thoughts with that ID' })
    };
};

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find(); 
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // get single thought by thought id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select("-__v");
    
            checkThought(thought);
    
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create a thought by passing required info into the req.body
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // update thought by thought id and passing changes in req.body
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators:true, new: true }
            );

            checkThought(thought);
    
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // delete thought by thought id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    
            checkThought(thought);
    
            res.json({ message: 'Thought deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // add a reaction to a thought by the thought id
    // create the reaction in the req.body
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            checkThought(thought);
    
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // delete a reaction by the thought id and reaction id
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId:req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            checkThought(thought);
    
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
};