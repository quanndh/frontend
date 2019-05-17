import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Footers from '../components/Footer';
import Product from '../components/Product';
import { Grid } from "@material-ui/core";
import axios from "axios";
class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            search: "",
            category: "",
        }
    }
    searchChange = text => {
        this.setState({search: text})
    }
    changeCategory = text => {
        this.setState({category: text})
    }
    componentDidMount(){
        axios.get("http://localhost:6969/api/products")
        .then(data => this.setState({products: data.data.data}))
        .catch(err => console.log(err))
    }
    render() {
        const { products, search } = this.state;
        console.log(search);
        const displayProducts =  products ? products.filter(product => product.title.toLowerCase().includes(search)).map(product => 
                <Product product={product} key={product._id}/>
        ) : "Loading..." ;
        return (
            <Grid container>
                <Grid item xs={12} style={{marginBottom: "40px"}}>
                    <Navbar onChange={this.searchChange} onClick={this.changeCategory}/>
                </Grid>
                <Grid item xs={12} md={3} >
                    Filter
                </Grid>
                <Grid item xs={12} md={9} style={{marginBottom: "40px"}}>
                    <Grid container spacing={32}>
                        {displayProducts}
                    </Grid>
                    
                </Grid>

                <Grid item xs={12}>
                    <Footers className=""/>
                </Grid>

            </Grid>

        );
    }
}

export default Main;
