import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./views/Main"


function App() {
  return (
    <Router>
        <div className="App">
          <Route path="/" exact render={props => {
            return <Main />
          }}></Route>
          <Route path="/imported" exact render={props => {
            return "imported"
          }}></Route>
        </div>
    </Router> 
  );
}

export default App;
