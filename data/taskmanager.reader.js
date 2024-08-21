import fs from "fs";
import path from "path";

//Path to the Task Manger JSON file
const filePath = path.resolve("data/tasks.json");

//Read task from the JSON file
export const readTask = () => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Write task from the JSON file
export const writeTask = (taskManager) => {
  fs.writeFileSync(filePath, JSON.stringify(taskManager, null, 2));
};
