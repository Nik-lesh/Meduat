import mongoose from "mongoose";
import { sampleDataMovies, sampleDataTV } from "./data/sampleData";
import dotenv from "dotenv";
import { MovieReview, TVShowReview } from "./model/schema"; // Import both models
import connectDB from "./db/databaseConnect";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Insert movie reviews
    const createMovieReview = await MovieReview.insertMany(sampleDataMovies);
    console.log(
      `Successfully imported ${createMovieReview.length} movie reviews.`
    );

    // Insert TV show reviews
    const createTVShowReview = await TVShowReview.insertMany(sampleDataTV);
    console.log(
      `Successfully imported ${createTVShowReview.length} TV show reviews.`
    );

    process.exit(0);
  } catch (error) {
    console.error("Error importing data", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Delete all movie reviews
    await MovieReview.deleteMany();
    // Delete all TV show reviews
    await TVShowReview.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

// Command-line logic to either destroy or import data
if (process.argv[2] === "destroy") {
  destroyData();
} else {
  importData();
}

importData(); // Import data by default
