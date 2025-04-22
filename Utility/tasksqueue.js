
import PriorityQueue from "./tasks_priority_queue.js";
import Task from "../Models/tasks.js";

class TaskQueue {
    constructor() {
        this.pq = new PriorityQueue();
        this.taskMap = {}                  //Hashmap used for O(1) lookups
    }

    // Load all existing tasks into the heap on server start
    async init() {
        const all = await Task.find({});
        all.forEach(task => {
            this.pq.enqueue(task, task.Priority_Level);
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
        this.pq.remove(taskId);                         // Built‑in heap removal
        delete this.taskMap[taskId];
    }

    // Update an existing task’s information
    update(task) {
        this.remove(task._id.toString());
        this.add(task);
    }

    // Snapshot of _all_ tasks in priority order:
    getAllSorted() {
        // clone the heap array, build a new PQ on it, then drain it
        const clone = new PriorityQueue();
        clone.heap = [...this.pq.heap];
        const sorted = [];
        while (!clone.isEmpty()) sorted.push(clone.dequeue());
        return sorted;
    }

    getById(taskId) {
        return this.taskMap[taskId] || null;
    }
}

export default new TaskQueue();
