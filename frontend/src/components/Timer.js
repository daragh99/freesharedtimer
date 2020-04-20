import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import styles from '../styles/variables';
import beep from '../assets/beep.mp3';
import withWebSocket from '../withWebSocket';

const Wrapper = styled.div`
  font-family: ${styles.fonts.serifPrimary};
  background-color: ${styles.colors.deepKamaru};
  font-weight: bold;
  font-size: 80px;
  color: ${styles.colors.roseMadder};
  padding: 28px;
  border: 1px solid ${styles.colors.roseMadder};
  border-radius: 4px;
  margin:auto;
  width: 248px;
`;

function Timer(props) {
  const { ws } = props;  
  const audioRef = useRef();

  const timer = useRef();


  const [secondsLeft, setSecondsLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [intervalSeconds, setIntervalSeconds] = useState(0);
  const [lastTimeStamp, setLastTimeStamp] = useState(0);
  
  ws.onopen = function() {
    ws.send('join');
  };

  ws.onmessage = function (event) {
    console.log('processing message');
    console.log(event.data);
    let data = null;
     try {
       data = JSON.parse(event.data);
     } catch(e) {
       console.log("couldn't parse %s", event.data);
     }
    if(data === null) return;

    const { runningState, intervalSeconds, timestamp } = data;
    setRunning(runningState);
    setLastTimeStamp(timestamp);
    setIntervalSeconds(intervalSeconds);
    printState();
  }

  useEffect(() => {
    if(secondsLeft === intervalSeconds || secondsLeft === 0) {
      audioRef.current && audioRef.current.play();
    }
  }, [secondsLeft]);

  useEffect(() => {
    timer.current = setTimeout(() => {
      const now = Date.now();
      const left = intervalSeconds - (Math.round((now - lastTimeStamp)/1000) % intervalSeconds);
      if(!isNaN(left) && running) setSecondsLeft(left);
      else setSecondsLeft(intervalSeconds);
    }, 1000);
  });

  const printState = () => {
    console.log ("running: %s lastTimeStamp: %s interval: %d", running, lastTimeStamp, intervalSeconds);
  }
  return (
    <>
      <Wrapper>
        {secondsLeft}
        <audio ref={audioRef} src={beep} controls={false} autoPlay={false}/>
      </Wrapper>
      <button onClick={(e) => setRunning(!running)} >{running ? 'Stop' : 'Start'}</button>
    </>
  )

}

export default withWebSocket(Timer);