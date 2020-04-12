import React from 'react';
import logo from './assets/watch.png';
import './App.css';
import Start from './Start.js';
import Join from './Join.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <img src={logo} />
      <Router>
        <Switch>
          <Route path="/start">
            <Start />
          </Route>
          <Route path="/join">
            <Join />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
