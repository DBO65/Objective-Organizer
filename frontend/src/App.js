import React from 'react';
import TaskDashboard from '.components/TaskDashboard';

//top-level component rendering the task dashboard
function App() {
  return (
    <div>
      <h1>Objective Organizer</h1>
      <TaskDashboard />
    </div>
  );
}

export default App;
