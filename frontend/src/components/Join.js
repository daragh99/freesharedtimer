import React from 'react';
import styled from 'styled-components';
import Timer from './Timer';

const Wrapper = styled.div`
  margin:auto;
  height:100%;
`;

export default function Join (props) {
  return (
    <Wrapper>
      <Timer />
    </Wrapper>
  );
}
