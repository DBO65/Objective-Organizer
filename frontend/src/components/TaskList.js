import React, { useState } from 'react';

function TaskList({ tasks, onDeleteTask, onEditTask }) {
  const [sortMode, setSortMode] = useState('deadline');
  const now = new Date();

  const sorted = [...tasks].sort((a, b) => {
    if (sortMode === 'priority') {
      return a.Priority_Level - b.Priority_Level;
    } else {
      const getScore = (task) => {
        const deadline = new Date(task.Deadline || '9999-12-31');
        const timeToDeadline = (deadline - now) / (1000 * 60 * 60 * 24);
        const normalizedPriority = 10 - (task.Priority_Level || 1);
        return Math.max(0, 30 - timeToDeadline) + normalizedPriority * 3;
      };
      return getScore(b) - getScore(a);
    }
  });

  return (
    <div style={{ width: '100%' }}>
      <label htmlFor="sort-mode">Sort by: </label>
      <select
        id="sort-mode"
        value={sortMode}
        onChange={(e) => setSortMode(e.target.value)}
        style={{ marginBottom: '1rem' }}
      >
        <option value="deadline">Deadline</option>
        <option value="priority">Priority</option>
      </select>

      <ul style={{ padding: 0 }}>
        {sorted.map(task => (
          <li key={task._id} style={{
            listStyle: 'none',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
            position: 'relative'
          }}>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{task.Task_Name}</div>
            <div>Task ID: {task.Task_ID}</div>
            <div>Assigned: {new Date(task.Date_Assigned).toLocaleDateString()}</div>
            <div>Deadline: {new Date(task.Deadline).toLocaleDateString()}</div>
            <div>Constraints: {task.Task_Constraints}</div>
            <div>Subtasks: {task.Subtask}</div>
            <div>Status: {task.Completion_Status ? '✅ Completed' : '❌ Incomplete'}</div>

            <div style={{
               position: 'absolute',
               top: '1rem',
               right: '1rem',
               backgroundColor:
               task.Priority_Level >= 8 ? '#ff4d4f' :
               task.Priority_Level >= 5 ? '#faad14' :
               '#52c41a',
               color: 'white',
               padding: '0.25rem 0.5rem',
               borderRadius: '4px',
               fontWeight: 'bold',
               fontSize: '0.8rem'
            }}>
              Priority: {task.Priority_Level}
            </div>

            <div style={{ marginTop: '0.75rem' }}>
              <button
                onClick={() => onDeleteTask(task._id)}
                style={{
                  marginRight: '0.5rem',
                  backgroundColor: '#d9d9d9',
                  color: '#000',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.4rem 0.8rem',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
              <button
                onClick={() => onEditTask(task)}
                style={{
                  backgroundColor: '#d9d9d9',
                  color: '#000',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.4rem 0.8rem',
                  cursor: 'pointer'
                }}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
