function toggleRunningMessage(running, intervalSeconds, timestamp) {
  return {
    message: 'toggle_running_state',
    running,
    intervalSeconds,
    timestamp,
  }
}

export default toggleRunningMessage;


