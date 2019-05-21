import React, { Component } from 'react';
import { Header, Navigation, Textfield} from 'react-mdl';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import {CartContext} from "../contexts/Cart";
import {UserContext} from "../contexts/User";
import { Typography } from '@material-ui/core';
import _ from "lodash";
import Axios from 'axios';

class NavbarSmall extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
        this.textChange = this.textChange.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    textChange(e){
        this.props.onChange(e.target.value)
    }

    onClick = e => {
        console.log(e.value);
    }

    logOut(){
        Axios.delete("http://localhost:6969/api/login" ||"https://xcommerce-server.herokuapp.com/api/login/",{
            withCredentials: true
        })
        .then(() => window.location.href = "/")
        .catch(err => console.log(err))
        
    }

    render() {
        const { searchText} = this.props;
        return (
                <Header className="nav" transparent title="ShopCANA" style={{transition: ".22s ease-in",width: "100%",right: "3.5px", position: 'fixed', backgroundColor: "black",  background: "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7))"}}>
                    
                    <Navigation>
                        <Link className="nav-text"  to="/" >Home</Link>
                        <Textfield
                            value={searchText}
                            onChange={this.textChange}
                            label="Search"
                            expandable
                            expandableIcon="search"
                        />
                        <Link className="nav-text"  to="/cart">
                            <IconButton aria-label="Cart">
                            <CartContext.Consumer>
                                {
                                    ({cartItems}) => (
                                        <Badge badgeContent={cartItems.length} color="primary">
                                            <ShoppingCartOutlinedIcon style={{color: "white"}}/>
                                        </Badge>   
                                    )   
                                }  
                            </CartContext.Consumer>
                            </IconButton>
                        </Link>
                        <UserContext.Consumer>
                            {
                                ({user}) => {
                                    if(!_.isEmpty(user) ){   
                                            return <Typography className="nav-text">{user.username} <Link className="nav-text"  to="/" onClick={this.logOut}>Log out</Link> </Typography> 
                                    } else {
                                        return <Link className="nav-text"  to="/login" >Log in</Link>
                                    }  
                                } 
                            }
                        </UserContext.Consumer>
                        
                        
                    </Navigation>
                </Header>
        );
    }
}

export default NavbarSmall;
