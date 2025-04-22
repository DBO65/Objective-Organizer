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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
        {Array.from({ length: 10 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Date Assigned"
        value={assigned}
        onChange={(e) => setAssigned(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Constraints"
        value={constraints}
        onChange={(e) => setConstraints(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Subtask Count"
        value={subtaskCount}
        onChange={(e) => setSubtaskCount(Number(e.target.value))}
        min="0"
      />
      <input
        type="number"
        placeholder="Task ID"
        value={taskId}
        onChange={(e) => setTaskId(Number(e.target.value))}
        required
      />
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
