import React, { Component } from 'react';
import {Grid, CardActionArea, CardActions, Button, CardContent, Card, CardMedia, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
class Product extends Component {
    render() {
        const { product, width } = this.props;
            
        
        return (
            <Grid item xs={12} md={6} lg={3}>
            <Link to={`/products/${product._id}`} style={{textDecoration: "none"}}>
                <Card>
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
                            {product.price}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="large" color="primary">
                            Add to cart
                        </Button>
                    </CardActions>
                </Card>
            </Link>
                
            </Grid>
        );
    }
}

export default Product;
