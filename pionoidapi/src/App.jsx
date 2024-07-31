import React, { useState } from 'react';


function App() {
  const [output, setOutput] = useState('');
  const [ipAddress, setIpAddress] = useState('');

  const handleClick = (route, times = null) => {
    let url = `http://localhost:8080${route}`;
    if (times) {
      url += `/${times}`;
    }
    fetch(url, {
      credentials: 'include' // Ensure cookies are sent with the request
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Use text() instead of json() due to no-cors mode
      })
      .then(data => {
        console.log(data);
        setOutput(data);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleSetIp = () => {
    fetch('http://localhost:8080/set_ip', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: ipAddress,
      credentials: 'include' // Ensure cookies are sent with the request
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        console.log(data);
        setOutput(data);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          placeholder="Enter IP Address"
        />
        <button className="App-button" onClick={handleSetIp}>Set IP Address</button>
      </div>
      <button className="App-button" onClick={() => handleClick('/login_in')}>Login In</button>
      <button className="App-button" onClick={() => handleClick('/login_out')}>Login Out</button>
      <button className="App-button" onClick={() => handleClick('/power_on')}>Power On</button>
      <button className="App-button" onClick={() => handleClick('/power_off')}>Power Off</button>
      <button className="App-button" onClick={() => handleClick('/enable_robot')}>Enable Robot</button>
      <button className="App-button" onClick={() => handleClick('/disable_robot')}>Disable Robot</button>
      <button className="App-button" onClick={() => handleClick('/shut_down')}>Shut Down</button>
      <button className="App-button" onClick={() => handleClick('/status')}>Robot Status</button>
      <button className="App-button" onClick={() => handleClick('/joint_move')}>pick(joint_move)</button>
      <button className="App-button" onClick={() => handleClick('/linear_move')}>place(linear_move)</button>
      <button className="App-button" onClick={() => handleClick('/digital_output_status')}>Tool Status</button>
      <button className="App-button" onClick={() => handleClick('/use_digital_output1')}>Gripper Outwards</button>
      <button className="App-button" onClick={() => handleClick('/use_digital_output2')}>Gripper Inwards</button>
      <button className="App-button" onClick={() => handleClick('/save_robot_status')}>save_status</button>
      <button className="App-button" onClick={() => handleClick('/run_saved_movements', 5)}>
        Run Movements 5 Times
      </button>

      <p className="App-output">{output}</p>
    </div>
  );
}

export default App;


/*
//GUI code for the app --must be in the app.jsx file

import './global.css';
import { useScrollToTop } from './hooks/use-scroll-to-top';
import Router from './routes/sections';
import ThemeProvider from './theme';

// --------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

*/