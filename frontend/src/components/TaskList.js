import React from 'react';

//displays a sorted list of tasks
function (TaskList({tasks, onDeleteTask, onEditTask}){
  const now = new Date();
  
  //sort tasks by a hybrid score based on deadline and manual priority
  const sorted = [...tasks].sort((a, b) => {
    const getScore = (task) => {
      const deadline = new Date(task.deadline || '9999-12-31');
      const timeToDeadline = (deadline - now) / (1000 * 60 * 60 * 24); //in days

      const normalizedPriority = 10 - (task.priority || 1); //higher priority = more weight
      const urgencyScore = Math.max(0, 30 - timeToDeadline); //max 30 points

      return urgencyScore + normalizedPriority * 3; //may need to change the weight, if need be
    };

    return getScore(b) - getScore(a); //higher score = higher priority
  });

  return (
      <ul>
        {sorted.map(task => (
          <li key={task._id}>
            <strong>{task.title}</strong>
            {' '} (Priority: {task.priority})
            {task.deadline && (
              <span> - Due: {new Date(task.deadline).toLocaleDateString()}</span>
            )}
            <button onClick={() => onDeleteTask(task._id)}>Delete</button>
            <button onClick={() => onEditTask(task}>Edit</button>
       </li>
     ))}
   </ul>
 );
}

export default TaskList;
