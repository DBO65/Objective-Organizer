import React, { useState } from 'react';

//displays list of tasks and allows sorting, deletion, and editing
function TaskList({ tasks, onDeleteTask, onEditTask }) {
  const [sortMode, setSortMode] = useState('deadline');  //default sort mode
  const now = new Date();  //current time for deadline completion

  //sorting logic: sort by priority or by custom urgency score (deadline)
  const sorted = [...tasks].sort((a, b) => {
    if (sortMode === 'priority') {
      //sort by ascending priority (lower value = higher priority)
      return a.Priority_Level - b.Priority_Level;
    } else {
      //sort by custom urgency score (deadline)
      const getScore = (task) => {
        const deadline = new Date(task.Deadline || '9999-12-31'); //fallback if no deadline
        const timeToDeadline = (deadline - now) / (1000 * 60 * 60 * 24);  //in days
        const normalizedPriority = 10 - (task.Priority_Level || 1);  //higher priority = higher score
        return Math.max(0, 30 - timeToDeadline) + normalizedPriority * 3;  //weighted score
      };
      return getScore(b) - getScore(a);  //descending order
    }
  });

  return (
    <div style={{ width: '100%' }}>
      {/* Sort dropdown */}
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

      {/* Task list */}
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
            {/* Task content */}
            <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{task.Task_Name}</div>
            <div>Task ID: {task.Task_ID}</div>
            <div>Assigned: {new Date(task.Date_Assigned).toLocaleDateString()}</div>
            <div>Deadline: {new Date(task.Deadline).toLocaleDateString()}</div>
            <div>Constraints: {task.Task_Constraints}</div>
            <div>Subtasks: {task.Subtask}</div>
            <div>Status: {task.Completion_Status ? '✅ Completed' : '❌ Incomplete'}</div>

            {/* Priority badge with color coding */}
            <div style={{
               position: 'absolute',
               top: '1rem',
               right: '1rem',
               backgroundColor:
               task.Priority_Level >= 8 ? '#ff4d4f' :    //low priority: red
               task.Priority_Level >= 5 ? '#faad14' :    //medium priority: yellow
               '#52c41a',                                //high priority: green
               color: 'white',
               padding: '0.25rem 0.5rem',
               borderRadius: '4px',
               fontWeight: 'bold',
               fontSize: '0.8rem'
            }}>
              Priority: {task.Priority_Level}
            </div>

            {/* Action buttons: Delete & Edit */}
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
