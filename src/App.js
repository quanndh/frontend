import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./views/Main"
import ProductDetail from "./views/ProductDetail";
import {CartProvider} from "./contexts/Cart"
import CartDetail from './views/CartDetail';
import Login from "./views/Login";
import Signup from "./views/Signup";
import axios from "axios";

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: {}
    }
  }

  componentDidMount(){
    axios.get("http://localhost:6969/api/login/me", {
      withCredentials: true
    })
      .then(data => {
        console.log(data.data.message);
        this.setState({
          user : data.data.message.user,
        })
      })
      .catch(err => console.log(err))
  }
  render(){
    return (
      <CartProvider>
        <Router>
          <div className="App">
            <Route path="/" exact render={props => {
              return <Main {...props}/>
            }}></Route>
          
            <Route path="/products/:productid" exact render={props => {
              return <ProductDetail {...props}/>
            }}></Route>
            <Route path="/cart" exact render={props => {
              return <CartDetail {...props}/>
            }}></Route>
            <Route path="/login" exact render={props => {
              return <Login {...props}/>
            }}></Route>
            <Route path="/signup" exact render={props => {
              return <Signup {...props}/>
            }}></Route>
          </div>
        </Router> 
      </CartProvider>
    );
  }
}

export default App;
