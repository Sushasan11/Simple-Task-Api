import mongoose from "mongoose";

// Define schema for the TaskManager model
const taskManagerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the TaskManager Model
const TaskManager = mongoose.model("TaskManager", taskManagerSchema); // Corrected model name
export default TaskManager;
