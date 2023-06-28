import { Schema, model, Types } from "mongoose";
import dateFormat from "../utils/dateFormat";

const ThoughSchema = new Schema({
  thoughtText: {
    type: String,
    required: "You need to leave a thought!",
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: {
    type: String,
    required: "You need to enter a username!",
  },
  reactions: [ReactionSchema],
});

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: "You need to leave a reaction!",
      maxlength: 280,
    },

    username: {
      type: String,
      required: "You need to enter a username!",
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", ThoughtSchema);

export default Thought;
