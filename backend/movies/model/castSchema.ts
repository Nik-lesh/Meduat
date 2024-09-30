import mongoose from "mongoose";

const CastSchema = new mongoose.Schema(
  {
    cast_id: {
      type: Number,
      required: true,
    },
    user_id: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    video: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const CastReview = mongoose.model("Cast_review", CastSchema);

export default CastSchema;
