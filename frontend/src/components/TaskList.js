import React from 'react';

//displays a sorted list of tasks
function (TaskList({tasks, onDeleteTask, onEditTask}){
  //sort tasks descending by priority (3 is the highest)
  const sorted = [...tasks].sort((a, b) => b.priority - a.priority);

  return (
      <ul>
        {sorted.map(task => (
          <li key={task._id}>
          {task.title} (Priority: {task.priority})
          <button onClick={() => onDeleteTask(task._id)}>Delete</button>
          <button onClick={() => onEditTask(task}>Edit</button>
       </li>
     ))}
   </ul>
 );
}

export default TaskList;
