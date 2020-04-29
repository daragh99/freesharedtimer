import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import withWebSocket from './hoc/withWebSocket'
import sendStateMessage from './Messages'
import Join from './Join';
import Button from './Button';
import Input from './Input';

const Wrapper = styled.div`
  padding: 40px;
`;

function Start (props) {
  const { ws } = props;

  ws.onopen = function(data) {
    ws.send('init');
    ws.send('join');
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
    printState();
  }

  const [running, setRunning] = useState(false);
  const [intervalSeconds, setIntervalSeconds] = useState(30);
  const [buttonText, setButtonText] = useState('Start');

  useEffect(() => {
    setButtonText(running ? 'Stop' : 'Start');
  }, [running]);

  const handleUpdateClick = () => {
    sendUpdate(running);
  };

  const handleStopStartClick = () => {
    sendUpdate(!running);
    setRunning(!running);
  }

  const sendUpdate = (requestedState) => {
    console.log('server state requested %s', running);
    const msg = sendStateMessage(requestedState, intervalSeconds, Date.now());
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
      <Wrapper>
        <Input type="number" value={intervalSeconds} onChange={handleIntervalChange}/>
        <Button value="start" onClick={handleUpdateClick} displayText="Update interval"></Button>
        <Button value="stop" onClick={handleStopStartClick} displayText={buttonText}></Button>
      </Wrapper>
      <Join/>
    </>
  );  
}

export default withWebSocket(Start);