import { Schema, model, models } from "mongoose";

const memeSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  meme: {
    type: String,
    required: [true, "Meme is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

const Meme = models.Meme || model("Meme", memeSchema);

export default Meme;
