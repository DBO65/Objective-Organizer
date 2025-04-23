import mongoose from "mongoose";                                        // Mongoose ODM for MongoDB interactions
import Task from "../Models/tasks.js"                                   // Task Mongoose model/schema
import taskQueue from "../Utility/tasksqueue.js";                       // In-memory priority queue + hashmap


// GET /api/tasks taht fetches all tasks in priority order
export const getTasks = async (req,res) => {
    try{
        // Retrieve sorted list from in-memory queue
        const tasks = taskQueue.getAllSorted();
        res.status(200).json({
            success: true,
            data: tasks
        });
    } catch(error) {
        console.error("Error in fetching tasks:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// POST /api/tasks that creates a new task document and enqueue it
export const createTasks = async(req,res) => {
    const task = req.body; //User will send this data


    if (!task.Task_Name || !task.Date_Assigned || !task.Deadline ||
        task.Priority_Level < 0 || !task.Task_Constraints ||
        task.Subtask < 0 || task.Completion_Status === undefined)
    {
        return res.status(400).json({
            success:false,
            message:"Please provide all fields"
        });
    }

    // Instantiate a new Mongoose Task document
    const newTask = new Task(task);

    try {
        await newTask.save();
        // Add to in-memory queue/map
        taskQueue.add(newTask);
        res.status(201).json({
            success: true,
            data: newTask
        })
    } catch(error){
        console.error("Error in creating the task:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

// DELETE /api/tasks/:ID it deletes a task by its MongoDB _id
export const deleteTasks = async(req,res) => {
    const { ID } = req.params;

    try {
        // Remove from MongoDB
        const deletedTask = await Task.findByIdAndDelete(ID)
        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        // Remove from in-memory queue/map
        taskQueue.remove(ID);
        res.status(200).json({
            success: true,
            message: "Task Deleted"
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Task not found"
        });
    }
}

// PUT /api/tasks/:ID and updates an existing task by its _id
export const updateTasks = async (req,res) => {
    const { ID } = req.params;

    const task = req.body;

    if(!mongoose.Types.ObjectId.isValid((ID))){
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    try {
        // Check for duplicate Task_ID in another document
        const existing = await Task.findOne({ Task_ID: task.Task_ID });

        if (existing && existing._id.toString() !== ID) {
            return res.status(400).json({
                success: false,
                message: "Duplicate Task_ID detected. Choose a different ID."
            });
        }

        // Perform the update and return the new document
        const updatedTask = await Task.findByIdAndUpdate(ID, task, {new: true})

        // If marking as completed, remove from queue; otherwise update
        if (updatedTask.Completion_Status) {
            taskQueue.remove(updatedTask._id.toString()); // Remove completed tasks
        } else {
            taskQueue.update(updatedTask); // Otherwise, update normally
        }

        res.status(200).json({
            success: true,
            data: updatedTask
        });

    }catch(error){
        console.error("Update Error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating Task",
            error: error.message
        });
    }
}

// GET /api/tasks/:ID retrieves a single task by its _id from the in-memory queue
export const getTaskById = (req, res) => {
    const { ID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(ID)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Task_ID"
        });
    }

    const task = taskQueue.getById(ID);
    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    return res.status(200).json({
        success: true,
        data: task }
    );
};
