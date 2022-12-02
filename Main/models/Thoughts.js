const { Schema, Types } = require('mongoose');
const reactionSchema = require('./Reaction');


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
    },
      userName:{
        type: String,
      required: true,
      max_length: 50,
    }   
  },
  {
    reac: [ReactionsSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: true,
  }
);

thoughtsSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const ReactionsSchema = new Schema(
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
const Thoughts = model('thought', thoughtsSchema)

module.exports = Thoughts;
