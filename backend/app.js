const WebSocket = require('ws');
const port = 8080;
const path = '/ws';

const wss = new WebSocket.Server({
  port,
  path,
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
      break;
    default:
      break;
  }
}


var runningState = false;
var lastTimeStamp = 0;
var intervalSeconds = 30;

function joinSession(ws) {
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