const { Schema, model } = require('mongoose');

// user schema to be passed into the User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email address",
          ],
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "thought",
        },
    ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
    ],
  },
  // virtuals true
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// virtual to count the amount of friends a user has
userSchema.virtual("friendCount")
.get(function () {
    return this.friends.length;
});

// User model
const User = model('user', userSchema);

module.exports = User;