import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

//manages all task state and coordinates between TaskForm and TaskList
function TaskDashboard(){
  const [tasks, setTasks] = useState([]);

  //gets tasks from backend when component mounts
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const response = await.get('http://localhost:3000/api/tasks');
    setTasks(response.data);
  };

  const addTask = async (task) => {
    await axios.post('http://localhost:3000/api/tasks', task);
    getTasks(); //get the task again after adding it
  };

  const deleteTask = async (id) => {
    await axios.delete('http://localhost:3000/api/tasks/${id}');
    getTasks(); //get the tasks again after deleting
  };

  return (
    <div>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onDeleteTask={deleteTask} />
    </div>
  );
}

export default TaskDashboard;
