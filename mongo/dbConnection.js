import mongoose from "mongoose";

// Function to connect to MongoDB database
export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};
