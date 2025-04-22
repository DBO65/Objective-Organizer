// tests/performance.test.js
import PriorityQueue from '../Utility/tasks_priority_queue.js';

describe('Data Structures and Algorithms Test', () => {
  const N = 100000;
  let data = [];
  let idsToTest = [];

  beforeAll(() => {
    // Generate random dataset of 100k items
    data = Array.from({ length: N }, (_, i) => ({
      id: i,
      priority: Math.floor(Math.random() * 10) + 1
    }));
    // Pick some random IDs to test lookups
    const getRandomId = () => Math.floor(Math.random() * N);
    idsToTest = Array.from({ length: 1000 }, () => getRandomId());
  });

  test('Min-Heap (PriorityQueue) vs Array Sort on 100k elements', () => {
    // Use PriorityQueue (min-heap)
    const heap = new PriorityQueue();
    data.forEach(item => heap.enqueue(item, item.priority));
    const heapSorted = [];
    while (!heap.isEmpty()) {
      heapSorted.push(heap.dequeue());
    }

    // Use built-in sort
    const sortSorted = [...data].sort((a, b) => a.priority - b.priority);

    // Verify results match
    expect(heapSorted).toEqual(sortSorted);
  });

  test('HashMap (O(1)) vs Linear Search (O(n))', () => {
    // Build a hash map
    const map = new Map();
    data.forEach(item => map.set(item.id, item));

    // Compare lookups
    idsToTest.forEach(id => {
      const fromMap = map.get(id);
      const fromLinear = data.find(item => item.id === id);
      expect(fromMap).toEqual(fromLinear);
    });
  });
});
