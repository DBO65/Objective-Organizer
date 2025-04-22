import React, { useState } from 'react';

function TaskList({ tasks, onDeleteTask, onEditTask }) {
  const [sortMode, setSortMode] = useState('deadline');
  const now = new Date();

  const sorted = [...tasks].sort((a, b) => {
    if (sortMode === 'priority') {
      return b.Priority_Level - a.Priority_Level;
    } else {
      const getScore = (task) => {
        const deadline = new Date(task.Deadline || '9999-12-31');
        const timeToDeadline = (deadline - now) / (1000 * 60 * 60 * 24);
        const normalizedPriority = 10 - (task.Priority_Level || 1);
        const urgencyScore = Math.max(0, 30 - timeToDeadline);
        return urgencyScore + normalizedPriority * 3;
      };
      return getScore(b) - getScore(a);
    }
  });

  return (
    <div>
      <label htmlFor="sort-mode">Sort by: </label>
      <select
        id="sort-mode"
        value={sortMode}
        onChange={(e) => setSortMode(e.target.value)}
      >
        <option value="deadline">Deadline</option>
        <option value="priority">Priority</option>
      </select>

      <ul>
        {sorted.map(task => (
          <li key={task._id}>
            <strong>{task.Task_Name}</strong>
            <div>Task ID: {task.Task_ID}</div>
            <div>Assigned: {new Date(task.Date_Assigned).toLocaleDateString()}</div>
            <div>Deadline: {new Date(task.Deadline).toLocaleDateString()}</div>
            <div>Constraints: {task.Task_Constraints}</div>
            <div>Subtasks: {task.Subtask}</div>
            <div>Status: {task.Completion_Status ? '✅ Completed' : '❌ Incomplete'}</div>

            <span style={{
              marginLeft: '0.5em',
              padding: '0.25em 0.5em',
              borderRadius: '6px',
              backgroundColor:
                task.Priority_Level >= 8 ? '#ff4d4f' :
                task.Priority_Level >= 5 ? '#faad14' :
                '#52c41a',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.75em'
            }}>
              (Priority: {task.Priority_Level})
            </span>

            <button onClick={() => onDeleteTask(task._id)}>Delete</button>
            <button onClick={() => onEditTask(task)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
