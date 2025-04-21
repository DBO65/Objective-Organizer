import React, {useState, useEffect} from 'react';

//a form component to input new task data
function TaskForm({onAddTask, onUpdateTask, taskToEdit}) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(1); //default priority
  const [deadline, setDeadline] = useState('');
  const [assigned, setAssigned] = useState('');
  const [constraints, setConstraints] = useState('');
  const [subtaskCount, setSubtaskCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setPriority(taskToEdit.PriorityLevel);
      setDeadline(taskToEdit.deadline ? taskToEdit.deadline.slice(0, 10) : '');
    } else {
      setTitle('');
      setPriority(1);
      setDeadline('');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title,
      priority,
      deadline,
      assigned,
      constraints,
      Number(subtaskCount),
      completed,
      ...(taskToEdit && {_id: taskToEdit._id}) //include id if editing
  };
     
    if (taskToEdit){
      onUpdateTask(taskData);
    } else {
      onAddTask(taskData);
    }
     
    setTitle('');
    setPriority(1); //reset after submit
    setDeadline('');
    setConstraints('');
    setSubtaskCount(0);
    setCompleted(false);
    setPriority(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape'){
            setTitle('');
            setPriority(1);
          }
        }}
        placeholder="Task title"
        required
      />
      <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
        {Array.from({length: 10}, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
          
        //<option value={1}>Low</option>
        //<option value={2}>Medium</option>
        //<option value={3}>High</option>

      </select>
      <input
          type="Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
      />
      <input
         placeholder="Date Assigned"
         type="date"
         value={assigned}
         onChange={(e) => setAssigned(e.target.value)}
         required
      />
      <input
         placeholder="Constraints"
         value={constraints}
         onChange={(e) => setConstraints(e.target.value)}
         required
      />
      <input
         placeholder="number"
         type="Subtask Count"
         value={subtaskCount}
         onChange={(e) => setSubtaskCount(e.target.value)}
         min="0"
      />
      
      <label>
         Completed:
         <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            required
       /> 
        
      <button type="submit">
          {taskToEdit ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
