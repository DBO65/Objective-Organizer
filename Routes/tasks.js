import express from "express";

import { getTasks, updateTasks, deleteTasks, createTasks, getTaskById } from "../Controllers/tasks.js"

const router = express.Router();

router.get("/", getTasks);

router.post("/", createTasks);

router.delete("/:ID", deleteTasks);

router.put("/:ID", updateTasks);

router.get("/:ID", getTaskById);

export default router;