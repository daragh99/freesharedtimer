import React, { useState } from 'react';
import styled from 'styled-components';
import Timer from './components/Timer';
import withWebSocket from './withWebSocket';

const Wrapper = styled.div`
  margin:auto;
  height:100%;
`;

function Join (props) {
  const { ws } = props;
  const [running, setRunning] = useState(false);
  const [intervalSeconds, setIntervalSeconds] = useState(0);
  const [lastTimeStamp, setLastTimeStamp] = useState(0);
  
  ws.onopen = function() {
    ws.send('join');
  };

  ws.onmessage = function (event) {
    console.log('processing message');
    console.log(event.data);
    const data = JSON.parse(event.data);
    const { runningState, intervalSeconds, lastTimeStamp } = data;

    setRunning(runningState);
    setIntervalSeconds(intervalSeconds);
    setLastTimeStamp(lastTimeStamp);
    
  }

  return (
    <Wrapper>
      <Timer 
        running={running}
        intervalSeconds={intervalSeconds}
        lastTimeStamp={lastTimeStamp}
      />
    </Wrapper>
  );
}

export default withWebSocket(Join);