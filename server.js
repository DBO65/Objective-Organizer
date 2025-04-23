// Import Express framework for building the API
import express from 'express';
// Load environment variables from .env file into process.env
import dotenv from 'dotenv';
// Import the function to connect to MongoDB
import {connectDB} from "./Config/db.js";
// Import our task-related routes
import taskRoutes from "./Routes/tasks.js"
// Import the in-memory task queue utility (min-heap + hashmap)
import taskQueue from "./Utility/tasksqueue.js";

// Initialize dotenv so process.env.MONGO_URI, etc. are available
dotenv.config();

// Create an Express application instance
const app = express();

//Allows JSON Data to be accepted in req.body
app.use(express.json());  

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the Task Manager API!");

});

// Mount the taskRoutes router on the "/api/tasks" path so that
// all routes defined in Routes/tasks.js will be prefixed with /api/tasks
app.use("/api/tasks", taskRoutes);

// Start the server on port 5000
// Before logging that we’re up, connect to MongoDB and initialize the in-memory queue
app.listen(5000, async() => {
    // Establish MongoDB connection
    await connectDB();
    // Load existing tasks from the database into the priority queue & map
    await taskQueue.init();
    console.log("Server started at http://localhost:5000");
});


