import mongoose from "mongoose";

const TvSchema = new mongoose.Schema(
  {
    movie_id: {
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

const TvReview = mongoose.model("Tv_review", TvSchema);

export default TvReview;
