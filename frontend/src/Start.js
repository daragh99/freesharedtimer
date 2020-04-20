import React, { useState, useEffect } from 'react'
import withWebSocket from './withWebSocket'
import sendStateMessage from './Messages'
import Join from './Join.js';

function Start (props) {
  const { ws } = props;

  ws.onopen = function(data) {
    ws.send('init');
  };

  ws.onmessage = function(event) {
    console.log('processing message');
    console.log(event.data);
    let data = null;
     try {
       data = JSON.parse(event.data);
     } catch(e) {
       console.log("couldn't parse %s", event.data);
     }
    if(data === null) return;

    const { runningState, intervalSeconds } = data;
    setRunning(runningState);
    setIntervalSeconds(intervalSeconds);
  }

  const [running, setRunning] = useState(false);
  const [intervalSeconds, setIntervalSeconds] = useState(30);
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    setButtonText( running ? 'Stop timer' : 'Start timer');
  }, [running]);

  const handleUpdateClick = () => {
    sendUpdate();
  };

  const handleStopStartClick = () => {
    setRunning(!running);
    sendUpdate();
  }

  const sendUpdate = () => {
    const msg = sendStateMessage(running, intervalSeconds, Date.now());
    ws.send(JSON.stringify(msg));
  }

  const printState = () =>  {
    console.log ("running: %s interval: %d", running, intervalSeconds);
  }

  const handleIntervalChange = (e) => {
    setIntervalSeconds(e.target.value);
  }

  return (
    <>
      <div>
        <input type="number" value={intervalSeconds} onChange={handleIntervalChange}/>
        <button value="start" onClick={handleUpdateClick} >Update interval</button>
        <button value="stop" onClick={handleStopStartClick}>{buttonText}</button>
      </div>
      <Join/>
    </>
  );  
}

export default withWebSocket(Start);