import React, { Component } from 'react';
import NavbarSmall from '../components/NavbarSmall';
import Footers from '../components/Footer';
import { CartContext } from "../contexts/Cart";
import CartItems from '../components/CartItems';
import {Grid} from "@material-ui/core";
import PaypalExpressBtn from 'react-paypal-express-checkout';
import axios from 'axios';

class CartDetail extends Component {
    constructor(){
        super();
        this.state = {
            items: [],
            user: {}
        }
        
    }
    componentDidMount(){
        window.scrollTo(0,0);
        this.setState({
            items: this.context.cartItems
        })
    }
    render() {
        const onSuccess = (payment) => {
            let items = this.state.items;
            
            axios.post("https://xcommerce-server.herokuapp.com/api/order", {
                buyerEmail: payment.email,
                orderedItems: items,
                address: payment.adress
            }, {
                withCredentials: true
            })
            .then(() => window.location.href = "https://xcommerce-client.herokuapp.com/")
            .catch(err => console.error(err))
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
                <Grid item xs={12} style={{margin: "120px auto 0", maxWidth: "70vw"}}>
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

CartDetail.contextType = CartContext;
export default CartDetail;
