import React, {useState} from 'react';

//a form component to input new task data
function TaskForm({onAddTask, onUpdateTask, taskToEdit}) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(1); //default priority
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setPriority(taskToEdit.priority);
      setDeadline(taskToEdit.deadline ? taskToEdit.deadline.slice(0, 10) : '');
    } else {
      setTitle('');
      setPriority(1);
      setDeadline('');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData;
      title,
      priority,
      deadline,
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange{(e) => setTitle(e.target.value)}
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
          <option key={i + 1}>
            {i + 1}
          </option>
        ))}
          
        //<option value={1}>Low</option>
        //<option value={2}>Medium</option>
        //<option value={3}>High</option>

      </select>
      <input
          type="date"
          value={deadline}
          onChange{(e) => setDeadline(e.target.value)}
      />
        
      <button type="submit">
          {taskToEdit ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
