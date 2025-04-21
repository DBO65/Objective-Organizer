import React from 'react';

//displays a sorted list of tasks
function (TaskList({tasks, onDeleteTask, onEditTask}){
  const [sortMode, setSortMode] = useState('deadline'); //"deadline" or "priority"
  const now = new Date();
  
  //sort tasks by a hybrid score based on deadline and manual priority
  const sorted = [...tasks].sort((a, b) => {
    if (sortMode === 'priority'){
      //sort in descneding order: 10 (highest) to 1 (lowest)
      return b.priority - a.priority;
    } else {
    //hybrid deadline-based sort
    const getScore = (task) => {
      const deadline = new Date(task.deadline || '9999-12-31');
      const timeToDeadline = (deadline - now) / (1000 * 60 * 60 * 24); //in days

      const normalizedPriority = 10 - (task.priority || 1); //higher priority = more weight
      const urgencyScore = Math.max(0, 30 - timeToDeadline); //max 30 points

      return urgencyScore + normalizedPriority * 3; //may need to change the weight, if need be
    };

    return getScore(b) - getScore(a); //higher score = higher priority
    }
  });

  return (
    <div>
    //SORT MODE SELECTOR
    <label htmlFor="sort-mode">Sort by: </label>
    <select
      id="sort-mode"
      value={sortMode}
      onChange{(e) => setSortMode(e.target.value)}
    >
      <option value="deadline">Deadline</option>
      <option value="priority">Priority</option>
    </select>

      //TASK LIST//
      <ul>
        {sorted.map(task => (
          <li key={task._id}>
            <strong>{task.title}</strong>
            //COLOR CODED PRIORITY BADGE
            <span style={{
              marginLeft: '0.5em',
              padding: '0.25em 0.5em',
              borderRadius: '6px',
              backgroundColor:
                task.priority >= 8 ? '#ff4d4f': //red
                task.priority >= 5 ? '#faad14': //yellow
                '#52c41a', //green
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.75em'
            }}>
              (Priority: {task.priority})
            </span>
                    
            {task.deadline && (
              <span> - Due: {new Date(task.deadline).toLocaleDateString()}</span>
            )}
            <button onClick={() => onDeleteTask(task._id)}>Delete</button>
            <button onClick={() => onEditTask(task}>Edit</button>
       </li>
     ))}
   </ul>
  </div>
 );
}

export default TaskList;
