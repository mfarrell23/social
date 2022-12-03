const { Schema, Types, model } = require('mongoose');

const reactionsSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
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
    },
      userName:{
        type: String,
      required: true,
      max_length: 50,
    }   
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userName:{
      type: String,
      required: true,
      max_length: 50,
    }   
  },
  {
    reaction: [reactionsSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtsSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});


const Thoughts = model('thought', thoughtsSchema)
const Reactions= model('reaction',reactionsSchema)

module.exports = Thoughts;
module.exports = Reactions;