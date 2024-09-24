import mongoose from "mongoose";

const recoverySchema = new mongoose.Schema({
  expires_start: {
    type: Date,
    default: new Date(),
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

export const recoveryModel = mongoose.model("Recovery", recoverySchema);
