import React, { Component } from 'react';
import {Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import { CartContext } from "../contexts/Cart";
class Product extends Component {
    render() {
        const { product } = this.props;
        
        return (
            <Grid item xs={12} md={6} lg={3}>

                <div class="container" style={{background: `url(${product.imageUrl})`, backgroundSize: "contain", backgroundRepeat: "no-repeat"}}>
                    <div class="overlay">
                       
                        <div class = "items"></div>
                        <Link to={`/products/${product._id}`} style={{textDecoration: "none", textDecorationColor: "none"}}>
                        <div class = "items head">
                            <p>{product.title}</p>
                            <hr/>
                        </div>
                        <div class = "items price">
                            <p class="new">{product.price}</p>
                        </div>
                        </Link>
                        <CartContext.Consumer>
                        
                        {
                            ({addToCart}) => (
                                <div class="items cart" onClick={() => addToCart(this.props.product)}>
                                    <i class="fa fa-shopping-cart"></i>
                                    <span>ADD TO CART</span>
                                </div>
                               
                            )   
                        }  
                        
                        </CartContext.Consumer>
                    </div>
                </div>
                
            </Grid>
        );
    }
}

export default Product;
