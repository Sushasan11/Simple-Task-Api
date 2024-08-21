import { json } from "express";
import TaskManger from "../models/taskmanager.model.js";
import { readTask, writeTask } from "../data/taskmanager.reader.js";

//Create New Task
export const createTask = (req, res) => {
  try {
    const { name, description, status } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ message: "Name field is missing" });
    }
    if (!description) {
      return res.status(400).json({ message: "Description field is missing" });
    }
    if (!status) {
      return res.status(400).json({ message: "Status field is missing" });
    }

    // Read existing tasks
    const tasks = readTask();

    // Create a new task object
    const newTask = {
      id: Date.now(),
      name,
      description,
      status,
    };
    // Add the new task to the list
    tasks.push(newTask);

    // Write updated tasks to the file
    writeTask(tasks);

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get all Task
export const getTask = (req, res) => {
  try {
    //Read all tasks from the JSON file
    const tasks = readTask();

    //Send tasks in the response
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task by ID
export const updateTask = (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    // Read existing tasks
    const tasks = readTask();

    // Find the task by ID
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update the task's details
    tasks[taskIndex] = { ...tasks[taskIndex], name, description, status };

    // Write the updated tasks back to the file
    writeTask(tasks);

    res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific task by ID
export const getTaskId = (req, res) => {
  try {
    const { id } = req.params;

    // Read existing tasks
    const tasks = readTask();

    // Find the task by ID
    const task = tasks.find((task) => task.id === parseInt(id));

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task by ID
export const deleteTask = (req, res) => {
  try {
    const { id } = req.params;

    // Read existing tasks
    const tasks = readTask();

    // Find the task by ID and remove it from the array
    const updatedTasks = tasks.filter((task) => task.id !== parseInt(id));

    if (tasks.length === updatedTasks.length) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Write the updated tasks back to the file
    writeTask(updatedTasks);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search tasks by keyword
export const searchTask = (req, res) => {
  try {
    // Extract the keyword query parameter from the request
    const { keyword } = req.query;

    // Check if the keyword is provided
    if (!keyword) {
      return res.status(400).json({ message: "Search keyword is required" });
    }

    // Read existing tasks
    const tasks = readTask();

    // Filter the tasks based on the keyword
    const filteredTasks = tasks.filter((task) =>
      task.name.toLowerCase().includes(keyword.toLowerCase())
    );

    // Return the filtered tasks
    res.status(200).json(filteredTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tasks filtered by status
export const getStatus = (req, res) => {
  try {
    const { status } = req.query;

    if (!status) {
      return res.status(400).json({ message: "No status to show " });
    }

    const tasks = readTask();
    const filteredTasks = tasks.filter(
      (task) => task.status.toLowerCase() === status.toLowerCase()
    );

    res.status(200).json(filteredTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tasks filtered by completion status
export const getCompletetask = (req, res) => {
  try {
    const { completed } = req.query;

    if (completed === undefined) {
      return res.status(400).json({ message: "No completed Task" });
    }

    const tasks = readTask();
    const filteredTasks = tasks.filter((task) =>
      completed.toLowerCase() === "true"
        ? task.status === "completed"
        : task.status !== "completed"
    );

    res.status(200).json(filteredTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
