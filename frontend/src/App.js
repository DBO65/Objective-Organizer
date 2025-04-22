import React from 'react';
import TaskDashboard from './components/TaskDashboard';

function App() {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#ffe0b2', minHeight: '100vh' }}>
      {/* Heading Section */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '0.3rem',
          color: '#0021A5'
        }}>
          Objective Organizer
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#0021A5'
        }}>
          Crush Your Goals, One Task at a Time!
        </p>
      </div>

      {/* Task Dashboard */}
      <TaskDashboard />
    </div>
  );
}

export default App;



