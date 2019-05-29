import React, { Component } from 'react';
import NavbarSmall from "../components/NavbarSmall";
import Footers from "../components/Footer"
import { Grid} from "@material-ui/core";
import axios from "axios";
import {CartContext} from "../contexts/Cart";
import _ from "lodash";
import {Button} from "antd";
import { UserContext } from '../contexts/User';

class ProductDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: {},
        }
    }
    componentDidMount() {
        window.scrollTo(0,0);
        axios.get( `https://xcommerce-server.herokuapp.com/api/products/${this.props.match.params.productid}`)
            .then(data => {
                this.setState({
                    product: data.data.data
                })
            })
            .catch(err => console.error(err))
    }

    render() {
        const { product } = this.state;
        return (
            <Grid container spacing={16} >
                <Grid item xs={12} >
                    <NavbarSmall />
                </Grid>
                <Grid item xs={12} style={{margin: "120px auto 0", maxWidth: "70vw"}}>
                    <Grid container style={{ display: "flex", justifyContent: "center"}}>
                        <Grid item xs={6} style={{width: "70%", height: "100%"}}>
                            <img src={product.imageUrl} alt="" style={{width: "55%", height: "100%"}}/>
                        </Grid>
                        <Grid item xs={6}>
                            <h1>{product.title}</h1>
                            <br/>
                            <h3>Details</h3>
                            <br/>
                            <h5>{product.discription}</h5>
                            <h5>${product.price}</h5>
                            <CartContext.Consumer>
                                {
                                    ({addToCart}) => (
                                        <Button type="primary" ghost onClick={() => {
                                            if(_.isEmpty(this.context.user)){
                                                alert("Please login before add to cart!!!")
                                            } else {
                                                addToCart(product)
                                            }}}>
                                            ADD TO CART
                                        </Button> 
                                    )
                                }
                            </CartContext.Consumer>
                            
                            
                        </Grid>
                    </Grid>
                    
                </Grid>
                <Grid item xs={12} style={{marginTop: "43px"}}>
                    <Footers />
                </Grid>
            </Grid>
                
            
        );
    }
}

ProductDetail.contextType = UserContext;
export default ProductDetail;
