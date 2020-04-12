import React from 'react';
import styled from 'styled-components';
import Timer from './components/Timer';

const Wrapper = styled.div`
  margin:auto;
  height:100%;
`;

function Join (props) {

  return (
    <Wrapper>
      <Timer />
    </Wrapper>
  );
}

export default Join;