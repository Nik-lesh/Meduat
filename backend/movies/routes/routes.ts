// This is for new people to understand
// Step 1: Fetch movie reviews from MongoDB
// Step 2: Extract unique user_ids from the reviews
// Step 3: Fetch user details from PostgreSQL
// Step 4: Map the user details to their corresponding reviews
// Step 5: Send the response with reviews and user details
// Main thing to consider: This is not a scable code it a tempory solution because, what if there are 1 million different users
// creating an array one 1 million entries and the again performig a search operation is not fesiable! Have to conisder this ASAN
import express from "express";
import asyncHandler from "./middleware/asyncHandler";
import { MovieReview, TVShowReview } from "../model/schema";
import { pool_User } from "../../postgrssDB";
import upload from "../multer/multer";

const route = express.Router();

route.get(
  "/:type/:id",
  asyncHandler(async (req, res) => {
    const { type, id } = req.params;

    let reviews;
    if (type === "movie") {
      reviews = await MovieReview.find({ movie_id: id });
    } else if (type === "tv") {
      reviews = await TVShowReview.find({ tvshow_id: id });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid type. Use 'movie' or 'tv'." });
    }

    //  dekh bhai simple se baat ither tune phle url se movie ki id le li and the wo id k jitne bhi movies h wo tune pass kr diye
    // ek array me movieRevies then tu wo array ko lega and you would perform a search operation based on the id of the reviews store in
    // the array now find the user bas fir kya all set.

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: `No reviews found for this ${type}` });
    }

    // ye imp tuze yad nhi rahega dekh now you created a new const which define or which selects the id of users from the movieReview
    // aur new Set kyuki, for example there are 2 or more reviews posted by one user to reduce the array size and compuationally effective
    // and one more thing to comsider is the lenght and how the search would be implemented
    const userIds = [...new Set(reviews.map((review) => review.user_id))];

    const usersResult = await pool_User.query(
      "SELECT id, username, profile_picture FROM users WHERE id = ANY($1::int[])",
      [userIds]
    );
    const users = usersResult.rows;

    const reviewsWithUserDetails = reviews.map((review) => {
      const user = users.find((u) => u.id === review.user_id);
      return {
        ...review.toObject(), // mongoose '_doc' converting to toobject() becasue now the respose include username and the profie pic so its like customizing it to give to client
        user: user,
      };
    });

    res.json(reviewsWithUserDetails);
  })
);

route.post(
  "/:type/:id",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const { type, id } = req.params;
    const { user_id, text, rating, video } = req.body;
    console.log("resonese", req.file);
    let imageUrl;

    // Check if file is uploaded and generate the URL
    if (req.file) {
      imageUrl = `/Movies/${req.file.filename}`; // File URL based on public/uploads folder
    }

    let newReview;
    if (type === "movie") {
      newReview = new MovieReview({
        movie_id: id,
        user_id,
        text,
        rating,
        image: imageUrl,
        video,
      });
    } else if (type === "tv") {
      newReview = new TVShowReview({
        tvshow_id: id,
        user_id,
        text,
        rating,
        image: imageUrl,
        video,
      });
    } else {
      return res
        .status(400)
        .json({ message: "error posting a review as the type is invalid'." });
    }

    // Save the new review to the database
    await newReview.save();

    return res
      .status(201)
      .json({ message: "Review added successfully", newReview });
  })
);

export default route;
