import React, { Component } from 'react';
import {Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import { CartContext } from "../contexts/Cart";
import { UserContext } from "../contexts/User";
import _ from "lodash";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCart';
import { Modal } from 'antd';


const createStyle = (imageUrl) => ({
    background: `url(${imageUrl})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundColor: `#FFFFFF`,
    backgroundPosition: "center"
});

function warning() {
    Modal.warning({
      title: 'Warning',
      content: 'Please login before add to cart.',
      centered: true
    });
  }

class Product extends Component {

    render() {
    const { product } = this.props;
    
    return (
        <Grid item xs={12} md={6} lg={3} style={{height: "400px", padding: "12px"}}>

            <div class="container" style={createStyle(product.imageUrl)}>
                <div class="overlay">
                    
                    <div class = "items"></div>
                    <Link to={`/products/${product._id}`} style={{textDecoration: "none", textDecorationColor: "none", padding: "10"}}>
                    <div class = "items head">
                        <p>{product.title}</p>
                        <hr/>
                    </div>
                    <div class = "items price">
                        <p class="new">${product.price}</p>
                    </div>
                    </Link>
                    <CartContext.Consumer>
                    {
                        ({addToCart}) => (
                            <div class="items cart" onClick={() => {
                                if(_.isEmpty(this.context.user)){
                                    warning();
                                } else {
                                    addToCart(product)
                                }
                            }}>
                                <ShoppingCartOutlinedIcon />
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


Product.contextType = UserContext;
export default Product;
