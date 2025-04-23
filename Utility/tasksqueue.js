// Import the min-heap implementation and the Mongoose Task model
import PriorityQueue from "./tasks_priority_queue.js";
import Task from "../Models/tasks.js";

class TaskQueue {
    constructor() {
        // The priority queue (min-heap) storing task objects by Priority_Level
        this.pq = new PriorityQueue();
        // A hashmap mapping task._id → task for O(1) direct lookups
        this.taskMap = {}                  
    }

    // Load all existing tasks into the heap on server start
    async init() {
        // Fetch all Task documents
        const all = await Task.find({});
        all.forEach(task => {
            // Enqueue each task into the heap using its priority
            this.pq.enqueue(task, task.Priority_Level);
            // Store it in the hashmap for quick getById lookups
            this.taskMap[task._id.toString()] = task;
        });
    }

    // Enqueue a newly created task
    add(task) {
        this.pq.enqueue(task, task.Priority_Level);
        this.taskMap[task._id.toString()] = task;
    }

    // Remove a deleted task
    remove(taskId) {
        // Built‑in heap removal
        this.pq.remove(taskId);  
        // Remove the entry from the hashmap
        delete this.taskMap[taskId];
    }

    // Update an existing task’s information
    update(task) {
        this.remove(task._id.toString());
        this.add(task);
    }

    // Snapshot of _all_ tasks in priority order:
    getAllSorted() {
        // clone the heap array, so it doesn't mess with the original 
        const clone = new PriorityQueue();
        clone.heap = [...this.pq.heap];

         // Drain the clone into a sorted array
        const sorted = [];
        while (!clone.isEmpty()) sorted.push(clone.dequeue());
        return sorted;
    }

    // Get a single task by its ID in O(1) via the hashmap; returns null if not found
    getById(taskId) {
        return this.taskMap[taskId] || null;
    }
}

// Export a singleton instance of TaskQueue for app-wide use
export default new TaskQueue();
