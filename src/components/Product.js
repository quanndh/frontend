import React, { Component } from 'react';
import {Grid, CardActionArea, CardActions, Button, CardContent, Card, CardMedia, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import { CartContext } from "../contexts/Cart";
class Product extends Component {
    render() {
        const { product, width } = this.props;
        console.log(product);
        
        return (
            <Grid item xs={12} md={6} lg={3}>
                <Card>
                <Link to={`/products/${product._id}`} style={{textDecoration: "none"}}>
                    <CardActionArea>
                        <CardMedia
                        style={{height: "400px", width: {width}}}
                        image={product.imageUrl}
                        title={product.title}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h3" component="h2">
                            {product.title}
                        </Typography>
                        <Typography gutterBottom variant="h3" component="h2">
                            ${product.price}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
                    <CartContext.Consumer>
                        
                        {
                            ({addToCart}) => (
                                <CardActions> 
                                    <Button size="large" color="primary" onClick={() => addToCart(this.props.product)}> Add to cart  </Button> 
                                </CardActions>
                               
                            )   
                        }  
                        
                    </CartContext.Consumer>
                    
                </Card>
                
            </Grid>
        );
    }
}

export default Product;
