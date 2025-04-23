import express from "express";

// Import controller functions for task operations
import { getTasks, updateTasks, deleteTasks, createTasks, getTaskById } from "../Controllers/tasks.js"

// Create a new router instance
const router = express.Router();

// GET    /api/tasks/ -> fetch all tasks (in priority order)
router.get("/", getTasks);

// POST   /api/tasks/ -> create a new task
router.post("/", createTasks);

// DELETE /api/tasks/:ID -> delete a task by its MongoDB _id
router.delete("/:ID", deleteTasks);

// PUT    /api/tasks/:ID -> update a task by its MongoDB _id
router.put("/:ID", updateTasks);

// GET    /api/tasks/:ID -> fetch a single task by its MongoDB _id
router.get("/:ID", getTaskById);

//GET /api/tasks/:ID -> fetch a single task by its TaskID

// Export the router to be mounted in server.js under "/api/tasks
export default router;
