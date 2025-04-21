import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

//manages all task state and coordinates between TaskForm and TaskList
function TaskDashboard(){
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null); //new state for editing
  const [error, setError] = useState(null); //for error handling

  //gets tasks from backend when component mounts
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
    const response = await axios.get('http://localhost:3000/api/tasks');
    setTasks(response.data);
  } catch (err) {
    setError('Failed to load tasks');
  }  
};

  const addTask = async (task) => {
    try {
    await axios.post('http://localhost:3000/api/tasks', task);
    getTasks(); //get the task again after adding it
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const deleteTask = async (id) => {
    try {
    await axios.delete('http://localhost:3000/api/tasks/${id}');
    getTasks(); //get the tasks again after deleting
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const startEditTask = (task) => {
    setTaskToEdit(task); //pass task to the form
  };

  const updateTask = async (updatedTask) => {
    try {
      await axios.put('http://localhost:3000/api/tasks/${updatedTask._id}', updatedTask);
    setTaskToEdit(null); //clear edit mode
    getTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  return (
    <div>
    {error && <div style={{color: 'red'}}>{error}</div>}
    <TaskForm 
      onAddTask={addTask}
      onUpdateTask={updateTask}
      taskToEdit={taskToEdit}
    />
    <TaskList 
        tasks={tasks} 
        onDeleteTask={deleteTask}
        onEditTask={startEditTask}
    />
  </div>
);
}

export default TaskDashboard;
