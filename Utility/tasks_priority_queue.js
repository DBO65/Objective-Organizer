export default class PriorityQueue {
    constructor() {
        // we store heap elements as { item, priority }
        this.heap = [];
    }

    // Swap elements at indices i and j
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    // Index helpers
    parent(i) { return Math.floor((i - 1) / 2); }
    left(i)   { return 2 * i + 1; }
    right(i)  { return 2 * i + 2; }

    // Move element at idx up to maintain heap property
    bubbleUp(idx) {
        while (idx > 0) {
            const p = this.parent(idx);
            if (this.heap[p].priority <= this.heap[idx].priority) break;
            this.swap(p, idx);
            idx = p;
        }
    }

    // Move element at idx down to maintain heap property
    bubbleDown(idx) {
        const n = this.heap.length;
        while (true) {
            let smallest = idx;
            const l = this.left(idx);
            const r = this.right(idx);

            if (l < n && this.heap[l].priority < this.heap[smallest].priority) {
                smallest = l;
            }
            if (r < n && this.heap[r].priority < this.heap[smallest].priority) {
                smallest = r;
            }
            if (smallest === idx) break;
            this.swap(idx, smallest);
            idx = smallest;
        }
    }

    // Add an item with its priority
    enqueue(item, priority) {
        this.heap.push({ item, priority });
        this.bubbleUp(this.heap.length - 1);
    }

    // Remove and return the item with lowest priority
    dequeue() {
        if (this.isEmpty()) return null;
        const min = this.heap[0].item;
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.bubbleDown(0);
        }
        return min;
    }

    // Remove an item from the heap by its task _id
    remove(taskId) {
        const index = this.heap.findIndex(entry => entry.item._id.toString() === taskId);
        if (index === -1) return;

        const last = this.heap.pop();
        if (index === this.heap.length) return;

            this.heap[index] = last;
            this.bubbleDown(index);
            this.bubbleUp(index);
    }


    // Peek at the item with lowest priority
    peek() {
        return this.isEmpty() ? null : this.heap[0].item;
    }

    // Check if the queue is empty
    isEmpty() {
        return this.heap.length === 0;
    }
}
