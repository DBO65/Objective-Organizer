import React from 'react';
import TaskDashboard from './components/TaskDashboard';

function App() {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#ffe0b2', minHeight: '100vh' }}>
      {/* Heading Section */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2rem',          //large font
          fontWeight: '600',         //bold
          marginBottom: '0.3rem',     //spacing below heading
          color: '#0021A5',          //blue color
          textTransform: 'uppercase',         // all caps
          //textDecoration: 'underline',        // underline
          //textDecorationColor: '#0021A5',     // Use UF blue for the underline
          //textUnderlineOffset: '5px'
        }}>
          Objective Organizer
        </h1>
       {/* Subheading Section */}
        <p style={{
          fontSize: '1rem',       //smaller font
          color: '#0021A5'        //same blue
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
