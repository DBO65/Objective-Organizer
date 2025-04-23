import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
    }
  };

  const addTask = async (task) => {
    try {
      await axios.post('/api/tasks', task);
      getTasks();
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      getTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      await axios.put(`/api/tasks/${updatedTask._id}`, updatedTask);
      setTaskToEdit(null);
      getTasks();
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      setError('Failed to update task');
    }
  };

  const startEditTask = (task) => {
    setTaskToEdit(task);
  };

  const searchTaskById = async () => {
    if (!searchId.trim()) return;
    try {
      const res = await axios.get(`/api/tasks/by-task-id/${searchId}`);
      setSearchResult(res.data.data);
      setError(null);
    } catch (err) {
      console.error("Search error:", err.response || err.message);
      setSearchResult(null);
      setError('Task not found or invalid Task ID');
    }
  };

  return (
    <div>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      {/* Search bar */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search Task by Task_ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ padding: '0.5rem', width: '250px' }}
        />
        <button onClick={searchTaskById} style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
          Search
        </button>
      </div>

      {/* Display search result */}
      {searchResult && (
        <div style={{ border: '1px solid gray', padding: '1rem', marginBottom: '1rem' }}>
          <h4>🔍 Search Result</h4>
          <p><strong>Title:</strong> {searchResult.Task_Name}</p>
          <p><strong>Description:</strong> {searchResult.Task_Constraints}</p>
          <p><strong>Priority:</strong> {searchResult.Priority_Level}</p>
          <p><strong>Deadline:</strong> {new Date(searchResult.Deadline).toLocaleDateString()}</p>
          <button onClick={() => setTaskToEdit(searchResult)}>Edit This Task</button>
        </div>
      )}

      {/* Main Layout */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: '1', maxWidth: '400px' }}>
          <TaskForm
            onAddTask={addTask}
            onUpdateTask={updateTask}
            taskToEdit={taskToEdit}
          />
        </div>
        <div style={{ flex: '2', minWidth: '400px' }}>
          <TaskList
            tasks={tasks}
            onDeleteTask={deleteTask}
            onEditTask={startEditTask}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskDashboard;
