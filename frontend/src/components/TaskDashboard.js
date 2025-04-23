import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

//manages all task state and coordinates between TaskForm and TaskList
function TaskDashboard(){
  const [tasks, setTasks] = useState([]);       //state for task list
  const [taskToEdit, setTaskToEdit] = useState(null); //new state for task currently in edit mode (null if not)
  const [error, setError] = useState(null); //state to store error messages, for error handling

  //gets tasks from backend when component is first rendered
  useEffect(() => {
    getTasks();
  }, []);

  // gets all tasks from backend
  const getTasks = async () => {
    try {
    const response = await axios.get('/api/tasks');
    setTasks(response.data.data);        //assuming tasks are under 'data' key
  } catch (err) {
    setError('Failed to load tasks');
  }  
};

  // posts a new task to the backend
  const addTask = async (task) => {
    try {
    await axios.post('/api/tasks', task);
    getTasks(); //refreshes the task list after editing
    } catch (err) {
      setError('Failed to add task');
    }
  };

  // deletes a task by id
  const deleteTask = async (id) => {
    try {
    await axios.delete(`/api/tasks/${id}`);
    getTasks(); //get the tasks again after deleting (refreshes the task list)
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  // prepares task to be edited (sends to TaskForm)
  const startEditTask = (task) => {
    setTaskToEdit(task); //pass task to the form
  };

  // updates a task in the backend
  const updateTask = async (updatedTask) => {
    try {
      await axios.put(`/api/tasks/${updatedTask._id}`, updatedTask);
    setTaskToEdit(null); //clear edit form after updating
    getTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  return (
    <div>
    {/* Displays error message, if any */}
    {error && <div style={{color: 'red'}}>{error}</div>}

    {/* FLEX LAYOUT- arranges form and list side-by-side or stacked */}
    <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '2rem',
        flexWrap: 'wrap'
      }}>
        {/* Left section: task creation/edit form */}
        <div style={{ flex: '1', maxWidth: '400px' }}>
          <TaskForm
            onAddTask={addTask}
            onUpdateTask={updateTask}
            taskToEdit={taskToEdit}
          />
        </div>
        {/* Right section: task list */}
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
