import React, { Component } from 'react';
import NavbarSmall from "../components/NavbarSmall";
import Footers from "../components/Footer"
import { Grid} from "@material-ui/core";
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
                <Grid item xs={12} style={{marginTop: "80px" }}>
                    <div class="container1">

                        <div class="item1">
                            <img src={product.imageUrl} id="current" alt=""/>
                            <div id="imgs" class="imgss">
                            
                            </div>

                        </div>

                        <div class="item2">
                            <h1 class="font-al title is-3">{product.title}</h1>
                            <div class="row-menu">
                                <h3 class="subtitle is-6">DETAILS</h3>
                            
                            </div>
                            <p class="font-al">{product.discription}</p>
                            <div class="button-buy">
                                <button class="btn fourth">ADD TO CART</button>
                            </div> 
                        </div> 
                    </div>
                </Grid>
                <Grid item xs={12} style={{marginTop: "43px"}}>
                    <Footers />
                </Grid>
            </Grid>
                
            
        );
    }
}

export default ProductDetail;
