import React from 'react';

function withWebSocket(WrappedComponent)   {
  const theSocket = new WebSocket('ws://localhost:8080/ws')
  return (props) => <WrappedComponent ws={theSocket} {...props} />
}

export default withWebSocket;