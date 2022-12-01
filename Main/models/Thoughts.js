const { Schema, Types } = require('mongoose');

const thoughtsSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      userName:{
        type: String,
      required: true,
      max_length: 50,
      }
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: true,
  }
);

module.exports = thoughtsSchema;
