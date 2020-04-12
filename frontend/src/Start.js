import React, { useState } from 'react'
import withWebSocket from './withWebSocket'
import toggleRunningMessage from './Messages'
import Join from './Join.js';

function Start (props) {
  const { ws } = props;

  ws.onopen = function(data) {
    ws.send('init');
  };

  ws.onmessage = function(event) {
    console.log(event.data);
  }

  const [running, setRunning] = useState(false);
  const [intervalSeconds, setIntervalSeconds] = useState(30);
  const [slug, setSlug] = useState('origin');

  const handleClick = () => {
    const msg = toggleRunningMessage(!running, intervalSeconds, Date.now());
    console.log(msg);
    ws.send(JSON.stringify(msg));
    setRunning(!running);
  };

  return (
    <>
      <div>
        <input type="number" value={intervalSeconds} onChange={(e) => setIntervalSeconds(e.target.value)}/>
        <button value="start" onClick={handleClick} >{running ? 'Stop' : 'Start'}</button>
      </div>
      <Join/>
    </>
  );  
}

export default withWebSocket(Start);