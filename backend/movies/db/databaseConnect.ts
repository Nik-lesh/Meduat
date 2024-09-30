import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI =
      "mongodb+srv://medhamanuja:oPvBscyle77gLHsE@cluster0.inrs8su.mongodb.net/";

    if (!mongoURI) {
      throw new Error("MongoDB connection string chal nhi raha");
    }

    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(
      `MongoDB Connection Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    process.exit(1);
  }
};

export default connectDB;
