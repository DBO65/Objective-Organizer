import React, {useState} from 'react';

//a form component to input new task data
function TaskForm({onAddTask}) {
  const [title, setTitle] = usetate('');
  const [priority, setPriority] = useState(1); //default priority

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({title, priority});
    setTitle('');
    setPriority(1); //reset after submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange{(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
      />
      <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
        <option value={1}>Low</option>
        <option value={2}>Medium</option>
        <option value={3}>High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}
