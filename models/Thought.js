const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

// thought schema to be passed into Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtValue => moment(createdAtValue).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
  },
  // getters and virtuals true
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// virtual to count how many reactions a thought has
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});

// Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
