import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./views/Main"
import ProductDetail from "./views/ProductDetail";

function App() {
  return (
    <Router>
        <div className="App">
          <Route path="/" exact render={props => {
            return <Main {...props}/>
          }}></Route>
         
          <Route path="/products/:productid" exact render={props => {
            return <ProductDetail {...props}/>
          }}></Route>
        </div>
    </Router> 
  );
}

export default App;
