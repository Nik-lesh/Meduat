import mongoose, { Document, Schema } from "mongoose";

interface IReply extends Document {
  user_id: number;
  text?: string;
  image?: string;
  video?: string;
  likes: number[];
  createdAt?: Date;
}
interface IRating extends Document {
  user_id: number;
  rating: number;
}

interface IComment extends Document {
  user_id: number;
  text?: string;
  image?: string;
  video?: string;
  likes: number[];
  replies: IReply[];
  createdAt?: Date;
}

interface IBaseReview extends Document {
  user_id: number;
  text?: string;
  image?: string;
  video?: string;
  likes: number[];
  comments: IComment[];
  shares: number;
  rating: number;
}

interface IMovieReview extends Document {
  movie_id: number;
}
interface ITVReview extends Document {
  tvshow_id: number;
}
// the reply schema
const replySchema = new Schema<IReply>({
  user_id: { type: Number, required: true },
  text: { type: String, required: false },
  image: { type: String, required: false },
  video: { type: String, required: false },
  likes: [{ type: Number }], // Array of user IDs who liked the reply
  createdAt: { type: Date, default: Date.now },
});

// the comment schema
const commentSchema = new Schema<IComment>({
  user_id: { type: Number, required: true },
  text: { type: String, required: false },
  image: { type: String, required: false },
  video: { type: String, required: false },
  likes: [{ type: Number }],
  replies: [replySchema], // Array of replies subdocuments
  createdAt: { type: Date, default: Date.now },
});

// the base review schema
const baseReviewSchema = new Schema<IBaseReview>(
  {
    user_id: { type: Number, required: true },
    text: { type: String, required: false },
    image: { type: String, required: false },
    video: { type: String, required: false },
    likes: [{ type: Number }], // Array of user IDs who liked the post
    comments: [commentSchema], // Array of comments subdocuments
    shares: { type: Number, default: 0 }, // Count of shares
    rating: { type: Number, required: false, min: 1, max: 10 },
  },
  {
    timestamps: true,
  }
);

// Validation middleware for the base schema to avoid empty object this will not allow an empty object
//ye pre hook muze bhi thik se nhi pata h but it is wokring just
baseReviewSchema.pre("validate", function (next) {
  if (!this.text && !this.image && !this.video) {
    next(new Error("At least one of text, image, or video must be provided."));
  } else {
    next();
  }
});

// ither movie schema define kiys and then the base schema jo bana h wo spread kiya now the issue with it could be that when multiple user
// try to inreactact at different type im  not sure how this would work have to check ASAN
const movieReviewSchema = new Schema<IMovieReview>({
  movie_id: { type: Number, required: true }, // Movie-specific field
  ...baseReviewSchema.obj, // Spread the base schema fields
});

// same as movies ka
const tvShowReviewSchema = new Schema<ITVReview>({
  tvshow_id: { type: Number, required: true }, // TV show-specific field
  ...baseReviewSchema.obj, // Spread the base schema fields
});

// Create models for movies and TV shows
const MovieReview = mongoose.model<IBaseReview>(
  "Movie_review",
  movieReviewSchema
);
const TVShowReview = mongoose.model<IBaseReview>(
  "TVShow_review",
  tvShowReviewSchema
);

export { MovieReview, TVShowReview };
