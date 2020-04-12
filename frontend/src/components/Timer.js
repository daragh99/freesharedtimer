import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import styles from '../styles/variables';
import beep from '../assets/beep.mp3';

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
  const { running, intervalSeconds } = props;  
  const audioRef = useRef();
  const [secondsLeft, setSecondsLeft] = useState(intervalSeconds);
  var timeout;

  useEffect(() => {
    
    timeout = setTimeout(() => {
      if(running) {
        var remaining = secondsLeft - 1;
        if(remaining === 0) {
          audioRef.current && audioRef.current.play();
        }
        if(remaining < 0 || isNaN(remaining)) {
          setSecondsLeft(intervalSeconds);
        }
        else setSecondsLeft(remaining);
      }
      else {
        setSecondsLeft(intervalSeconds);
      }
    }, 1000);
  
  });

  return (
    <Wrapper>
      {secondsLeft}
      <audio ref={audioRef} src={beep} controls={false} autoPlay={false}/>
    </Wrapper>
  )

}

export default Timer;