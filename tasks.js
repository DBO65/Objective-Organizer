// models/Task.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    Task_ID: {
        type: Number,
        required: true,
        unique: true
    },
    Task_Name: {
        type: String,
        required: true,
        trim: true
    },
    Date_Assigned: {
        type: Date,
        required: true,
        default: Date.now
    },
    Deadline: {
        type: Date,
        required: true
    },
    Priority_Level: {
        type: Number,           //1-10 scale for the priority with the lower the number the more important
        required: true,
        min: 1,
        max: 10
    },
    Task_Constraints: {
        type: String,
        default: 'None'
    },
    Subtask: {
        type: Number,
        default: 0,
        min: 0
    },
    Completion_Status: {
        type: Boolean,
        default: false
    },
},{
    timestamps: true //Created at, updated at
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
