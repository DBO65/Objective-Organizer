import React, { useState, useEffect } from 'react';

function TaskForm({ onAddTask, onUpdateTask, taskToEdit }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(1);
  const [deadline, setDeadline] = useState('');
  const [assigned, setAssigned] = useState('');
  const [constraints, setConstraints] = useState('');
  const [subtaskCount, setSubtaskCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [taskId, setTaskId] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTaskId(taskToEdit.Task_ID);
      setTitle(taskToEdit.Task_Name);
      setPriority(taskToEdit.Priority_Level);
      setDeadline(taskToEdit.Deadline ? taskToEdit.Deadline.slice(0, 10) : '');
      setAssigned(taskToEdit.Date_Assigned ? taskToEdit.Date_Assigned.slice(0, 10) : '');
      setConstraints(taskToEdit.Task_Constraints || '');
      setSubtaskCount(taskToEdit.Subtask || 0);
      setCompleted(taskToEdit.Completion_Status || false);
    } else {
      setTaskId('');
      setTitle('');
      setPriority(1);
      setDeadline('');
      setAssigned('');
      setConstraints('');
      setSubtaskCount(0);
      setCompleted(false);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      Task_ID: Number(taskId),
      Task_Name: title,
      Priority_Level: Number(priority),
      Deadline: deadline,
      Date_Assigned: assigned,
      Task_Constraints: constraints,
      Subtask: Number(subtaskCount),
      Completion_Status: completed,
      ...(taskToEdit && { _id: taskToEdit._id }),
    };

    if (taskToEdit) {
      onUpdateTask(taskData);
    } else {
      onAddTask(taskData);
    }

    // Reset form
    setTaskId('');
    setTitle('');
    setPriority(1);
    setDeadline('');
    setAssigned('');
    setConstraints('');
    setSubtaskCount(0);
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label>
        Task Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        Priority Level:
        <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </label>

      <label>
        Deadline:
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </label>

      <label>
        Date Assigned:
        <input
          type="date"
          value={assigned}
          onChange={(e) => setAssigned(e.target.value)}
          required
        />
      </label>

      <label>
        Task Constraints:
        <input
          type="text"
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          required
        />
      </label>

      <label>
        Subtask Count:
        <input
          type="number"
          value={subtaskCount}
          onChange={(e) => setSubtaskCount(Number(e.target.value))}
          min="0"
        />
      </label>

      <label>
        Task ID:
        <input
          type="number"
          value={taskId}
          onChange={(e) => setTaskId(Number(e.target.value))}
          required
        />
      </label>

      <label>
        Completed:
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
      </label>

      <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
}

export default TaskForm;
