import React, { Component } from 'react';
import NavbarSmall from '../components/NavbarSmall';
import Footers from '../components/Footer';
import { CartContext } from "../contexts/Cart";
import CartItems from '../components/CartItems';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import axios from 'axios';
import { Modal } from 'antd';
import _ from "lodash";

function warning() {
    Modal.warning({
      title: 'Warning',
      content: 'No product in your cart yet.',
      centered: true
    });
  }


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
        if(_.isEmpty(this.context.cartItems)){
            warning();
        }
    }
    render() {
        const onSuccess = (payment) => {
            let items = this.state.items;
            console.log(payment)
            axios.post("https://xcommerce-server.herokuapp.com/api/order", {
                buyerEmail: payment.email,
                orderedItems: items,
                address: payment.adress
            }, {
                withCredentials: true
            })
            .then(() =>  console.log(payment))
            .catch(err => console.error(err))
        }
 
        const onCancel = (data) => {
         
            console.log('The payment was cancelled!', data);
          
        }
 
        const onError = (err) => {
            warning();
            console.log("Error!", err);
           
        }
 
        let env = 'sandbox';
        let currency = 'USD';
 
        const client = {
            sandbox:    'AWWWEDu7poi8Ea1N3mWvxqMuVswUlNe_AS2d0rUJhwRjnxXFZq5LNw4RzgNsRnXUCRj846vzpj4fluJ5',
            production: 'EOUoXQa7PM4vvB4bKF5keZ52jhh1GyG82ALgQ2nY3B6ts-kzaqZKqkm7x3SNJYLPFKVORAGPh73TGFgX',
        }
        return (
            <div id="wrapper">
                <NavbarSmall />
                <div id="bodyWrapper" style={{paddingBottom: "320px"}}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <CartContext.Consumer>
                            {
                                ({cartItems}) => (
                                    <CartItems items={cartItems}/>
                                )
                            }
                        </CartContext.Consumer>
                    </div>
                        
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "40px"}}>
                        <CartContext.Consumer>
                            {
                                ({totalPrice, cartItems}) => 
                                    !_.isEmpty(cartItems) ? (
                                            <PaypalExpressBtn 
                                            env={env} 
                                            client={client} 
                                            currency={currency} 
                                            total={totalPrice()} 
                                            onError={onError}
                                            onCancel={onCancel}
                                            onSuccess={onSuccess} 
                                    
                                            style={{
                                                size: 'large',
                                                color: 'black',
                                                shape: 'rect',
                                                label: 'buynow',
                                                tagline: 'true'
                                            }}
                                            />
                                    )
                                    : (
                                    <PaypalExpressBtn 
                                        style={{
                                            size: 'large',
                                            color: 'black',
                                            shape: 'rect',
                                            label: 'buynow',
                                            tagline: 'true'
                                        }}
                                    />
                                )
                            }
                        
                        </CartContext.Consumer>

                    </div>   
                </div>
                
                <Footers/>
            </div>

             /* // <Grid container spacing={16}>
            //     <Grid item xs={12}>
            //         <NavbarSmall />
            //     </Grid>
            //     <Grid item xs={12} style={{margin: "120px auto 0", maxWidth: "70vw"}}>
                    
            //     </Grid>
            //     <Grid item xs={12} style={{display: "flex", justifyContent: "center", marginTop: "36px"}}>
                   
            //     </Grid>
            //     <Grid item xs={12} style={{marginTop: "40px"}}>
            //         <Footers />
            //     </Grid>
                
            // </Grid>  */
            
        );
    }
}

CartDetail.contextType = CartContext;
export default CartDetail;
