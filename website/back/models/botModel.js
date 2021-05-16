import mongoose from 'mongoose';

const BotSchema = mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Bot = mongoose.model('Bot', BotSchema);

export default Bot;
