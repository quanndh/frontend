import React, { Component } from 'react';
import NavbarSmall from '../components/NavbarSmall';
import Footers from '../components/Footer';
import { CartContext } from "../contexts/Cart";
import CartItems from '../components/CartItems';
import {Grid} from "@material-ui/core";
import PaypalExpressBtn from 'react-paypal-express-checkout';

class CartDetail extends Component {
    render() {
        const onSuccess = (payment) => {
        
            		console.log("The payment was succeeded!", payment);
            	
        }
 
        const onCancel = (data) => {
         
            console.log('The payment was cancelled!', data);
          
        }
 
        const onError = (err) => {
           
            console.log("Error!", err);
           
        }
 
        let env = 'sandbox';
        let currency = 'USD';
 
        const client = {
            sandbox:    'AWWWEDu7poi8Ea1N3mWvxqMuVswUlNe_AS2d0rUJhwRjnxXFZq5LNw4RzgNsRnXUCRj846vzpj4fluJ5',
            production: 'EOUoXQa7PM4vvB4bKF5keZ52jhh1GyG82ALgQ2nY3B6ts-kzaqZKqkm7x3SNJYLPFKVORAGPh73TGFgX',
        }
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
                <Grid item xs={12} style={{display: "flex", justifyContent: "center", marginTop: "36px"}}>
                    <CartContext.Consumer>
                    {
                        ({totalPrice}) => (
                            <PaypalExpressBtn env={env} client={client} currency={currency} total={totalPrice()} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
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
