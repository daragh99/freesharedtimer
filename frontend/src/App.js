import React from 'react';
import logo from './assets/watch.png';
import './App.css';
import { Start, Join } from './components';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <img src={logo} />
      <Router>
        <Switch>
          <Route path="/start/:slug">
            <Start />
          </Route>
          <Route path="/join/:slug">
            <Join />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
