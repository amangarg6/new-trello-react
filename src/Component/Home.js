// Home.jsx

import React from 'react';
import Sidebar from './Sidebar';
import './Home.css'; // Import your CSS file

function Home() {
  return (
    <div className='row'>
      <Sidebar/>
      <div className='text-center col-10 home-container'>
        <h1>Welcome to Trello</h1>
        <p>Organize your tasks and collaborate with your team in a simple and effective way!</p>

        <div className="features-section">
          <h2>Key Features</h2>
          <ul>
            <li>Create boards to organize your projects</li>
            <li>Add lists to categorize tasks</li>
            <li>Drag and drop cards for easy task management</li>
            <li>Collaborate with team members in real-time</li>
          </ul>
        </div>

        
      </div>
    </div>
  );
}

export default Home;
