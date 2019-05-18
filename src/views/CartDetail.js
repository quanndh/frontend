import React, { Component } from 'react';
import NavbarSmall from '../components/NavbarSmall';
import Footers from '../components/Footer';
import { CartContext } from "../contexts/Cart";
import CartItems from '../components/CartItems';
import {Grid} from "@material-ui/core";

class CartDetail extends Component {
    render() {
        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <NavbarSmall />
                </Grid>
                <Grid item xs={12} style={{marginTop: "80px"}}>
                    <CartContext.Consumer>
                        {
                            ({cartItems}) => (
                                <CartItems items={cartItems}/>
                            )
                        }
                    </CartContext.Consumer>
                </Grid>
                <Grid item xs={12} style={{marginTop: "40px"}}>
                    <Footers />
                </Grid>
            </Grid>
        );
    }
}

export default CartDetail;
