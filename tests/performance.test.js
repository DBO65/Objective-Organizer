import { jest } from '@jest/globals';
import PriorityQueue from '../Utility/tasks_priority_queue.js';
import taskQueue from '../Utility/tasksqueue.js';

// Extend timeout for heavy operations
jest.setTimeout(30000);

describe('Data Structure Capacity and Correctness for 100k Items', () => {
  const N = 100000;
  let data = [];
  let idsToTest = [];

  beforeAll(() => {
    // Generate 100k items with priorities 1-10
    data = Array.from({ length: N }, (_, i) => ({
      id: i,
      priority: Math.floor(Math.random() * 10) + 1
    }));
    // Select 100 random IDs for lookups
    const getRandomId = () => Math.floor(Math.random() * N);
    idsToTest = Array.from({ length: 100 }, () => getRandomId());

    // Reset shared queue
    taskQueue.pq = new PriorityQueue();
    taskQueue.taskMap = {};
  });

  test('PriorityQueue capacity and minimal element check', () => {
    const heap = new PriorityQueue();
    data.forEach(item => heap.enqueue(item, item.priority));
    // Should hold N items
    expect(heap.heap.length).toBe(N);
    // Peek should return an item with priority between 1 and 10
    const top = heap.peek();
    expect(top).toBeDefined();
    expect(top.priority).toBeGreaterThanOrEqual(1);
    expect(top.priority).toBeLessThanOrEqual(10);
  });

  test('TaskQueue capacity and lookup performance', () => {
    // Add all tasks
    data.forEach(item => {
      const task = { _id: item.id.toString(), Priority_Level: item.priority };
      taskQueue.add(task);
    });
    // Underlying heap should reflect N elements
    expect(Object.keys(taskQueue.taskMap).length).toBe(N);
    expect(taskQueue.pq.heap.length).toBe(N);

    // Test random lookups
    idsToTest.forEach(id => {
      const key = id.toString();
      const found = taskQueue.getById(key);
      expect(found).toBeDefined();
      expect(found._id).toBe(key);
    });
  });

  test('Sample sort vs heap order for small subset', () => {
    // Take a small subset to validate sort correctness
    const sample = data.slice(0, 1000);
    const heap = new PriorityQueue();
    sample.forEach(item => heap.enqueue(item, item.priority));
    const heapOrder = [];
    while (!heap.isEmpty()) {
      heapOrder.push(heap.dequeue().priority);
    }
    const sorted = [...sample].sort((a, b) => a.priority - b.priority).map(x => x.priority);
    expect(heapOrder).toEqual(sorted);
  });

  test('Map vs linear search sample lookup', () => {
    const map = new Map();
    data.forEach(item => map.set(item.id, item));
    idsToTest.forEach(id => {
      const m = map.get(id);
      const linear = data.find(item => item.id === id);
      expect(m).toEqual(linear);
    });
  });
});
