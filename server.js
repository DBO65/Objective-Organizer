import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./Config/db.js";
import taskRoutes from "./Routes/tasks.js"
import taskQueue from "./Utility/tasksqueue.js";

dotenv.config();

const app = express();

app.use(express.json());  //Allows JSON Data to be accepted in req.body

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the Task Manager API!");

});

app.use("/api/tasks", taskRoutes);

app.listen(5000, async() => {
    await connectDB();
    await taskQueue.init();
    console.log("Server started at http://localhost:5000");
});


