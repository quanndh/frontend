import React, { Component } from 'react';
import NavbarSmall from "../components/NavbarSmall";
import Footers from "../components/Footer"
import { Grid, Paper, Typography } from "@material-ui/core";
import axios from "axios";

class ProductDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: {},
        }
    }
    componentDidMount() {
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
            <Grid container spacing={16}>
                <Grid item xs={12} >
                    <NavbarSmall />
                </Grid>
                <Grid item xs={12} style={{marginTop: "80px" ,display: "flex"}}>
                    <Grid item md={12} lg={6} style={{ justifyContent:"center", display:"flex"}}>
                        <Paper>
                            <img alt="" src={product.imageUrl} style={{width: "400px", height: "600px"}}/>
                        </Paper>
                        
                    </Grid>
                    <Grid item  md={12} lg={6}>
                        <Paper elevation={1}  style={{ height: "600px", width: "800px"}}>
                            <Typography variant="h1" component="h1" style={{marginBottom: "80px"}}>
                                {product.title}
                            </Typography>
                            <Typography variant="h3" component="h2" style={{marginBottom: "160px"}}>
                                Price: ${product.price}
                            </Typography>
                            <Typography variant="h4">
                                {product.discription}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{marginTop: "43px"}}>
                    <Footers />
                </Grid>
            </Grid>
                
            
        );
    }
}

export default ProductDetail;
