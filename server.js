const WebSocket = require('ws');
const path = require('path');
const wsPort = process.env.WS_PORT || 8080;
const wsPath = '/ws';


const express = require('express');
const app = express();
const httpPort = process.env.PORT || 5000;

/**
 * Start express to serve the React client
 */

app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});
app.listen(httpPort, () => console.log(`Listening on port ${httpPort}`));



/**
 * Set up the WebSocket
 */

const wss = new WebSocket.Server({
  port: wsPort,
  path: wsPath,
});

console.log ('Listening on 8080');

wss.on('connection', ws => {
  ws.on('message', message => {
    console.dir(message, { depth: null });
    switch (message) {
      case 'init':
        break;
      case 'join':
        joinSession(ws);
        break;
      default: {
        const parsed = JSON.parse(message);
        handleMessage(parsed, ws);
      }
    }
    ws.send()
  });
})

function handleMessage(payload, ws) {
  console.dir(payload, { depth: null });
  switch(payload.message) {
    case 'toggle_running_state': 
      setRunningState(payload.running);
      setIntervalSeconds(payload.intervalSeconds);
      setLastTimestamp(Date.now());
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ 
            message:'current_running_state',
            runningState,
            intervalSeconds,
            timestamp: lastTimeStamp,
          }));
        }
      });
      printState();
      break;
    default:
      break;
  }
}

function printState() {
  console.log ("running: %s lastTimeStamp: %s interval: %d", runningState, lastTimeStamp, intervalSeconds);
}

var runningState = false;
var lastTimeStamp = 0;
var intervalSeconds = 30;

function joinSession(ws) {
  printState();
  const message = {
    message: 'current_running_state',
    runningState,
    intervalSeconds,
    timestamp: lastTimeStamp,
  }
  ws.send(JSON.stringify(message));
}


function setRunningState(rs) {
  runningState = rs;
}

function setLastTimestamp(timestamp) {
  lastTimeStamp = timestamp;
}

function setIntervalSeconds(seconds) {
  intervalSeconds = seconds;
}