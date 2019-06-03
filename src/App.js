import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./views/Main"
import ProductDetail from "./views/ProductDetail";
import {CartProvider} from "./contexts/Cart"
import CartDetail from './views/CartDetail';
import Login from "./views/Login";
import Signup from "./views/Signup";
import {UserProvider, UserContext} from './contexts/User';
import _ from "lodash";

class App extends Component {
  constructor(){
    super()
    this.state = {
      user: {}
    }
  }
  render(){
    
    return (
      <CartProvider>
        <UserProvider>
          <UserContext.Consumer>
            {
              ({getInfo, user}) => {
               _.isEmpty(user) ? getInfo() : console.log(user.email)
              } 
            }
            
          </UserContext.Consumer>
          
          <Router>
            <div className="App">

              <UserContext.Consumer>
              {
                ({user}) => {
                  return <Route path="/" exact render={props => {
                          return <Main user={user} {...props}/>
                        }}></Route>
                } 
              }
              
              </UserContext.Consumer>
              
            
              <Route path="/products/:productid" exact render={props => {
                return <ProductDetail  {...props}/>
              }}></Route>

              <Route path="/cart" exact render={props => {
                return <CartDetail  {...props}/>
              }}></Route>

              <Route path="/login" exact render={props => {
                return <Login  {...props}/>
              }}></Route>

              <Route path="/signup" exact render={props => {
                return <Signup  {...props}/>
              }}></Route>

            </div>

          </Router> 
        </UserProvider>
        
      </CartProvider>
    );
  }
}

App.contextType = UserContext;
export default App;
