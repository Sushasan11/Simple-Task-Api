import { Router } from "express";
import {
  createTask,
  updateStatus,
  updateTask,
  getTask,
  getTaskId,
  deleteTask,
  searchTask,
  getStatus,
  getCompletetask,
} from "../controllers/taskmanager.controller.js";

const router = Router();

// Route to create a new task
router.post("/createtask", createTask);

//Route to update a task by id
router.put("/update/:id", updateTask);

//Route to update a task by status
router.patch("/update/:id", updateStatus);

//Route to get all task
router.get("/result", getTask);

//Route to get task by id
router.get("/result/id/:id", getTaskId);

//Route to delete task by id
router.delete("/delete/:id", deleteTask);

// Route to search notes by keyword
router.get("/search", searchTask);

// Route to get tasks by status
router.get("/filter/status", getStatus);

// Route to get tasks filtered by completion status
router.get("/filter/completion", getCompletetask);

export default router;
