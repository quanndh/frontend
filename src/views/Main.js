import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Footers from '../components/Footer';
import Product from '../components/Product';
import { Grid } from "@material-ui/core";
import axios from "axios";
import Filter from '../components/Filter';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            search: "",
            category: "all",
            price: {value: 200},
            page: "",
            nPage: "",
        }
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next() {
        this.setState({
            page: this.state.page*1 + 1
        })
    }
    previous() {
        this.setState({
            page: this.state.page*1 - 1
        })
    }
    searchChange = text => {
        this.setState({search: text})
    }
    changeCategory = text => {
        this.setState({category: text})
    }

    changePrice = text => {
        this.setState({price: text})
    }
    componentDidMount(){
        axios.get("http://localhost:6969/api/products/"||"https://xcommerce-server.herokuapp.com/api/products/")
        .then(data => this.setState({products: data.data.data, nPages: data.data.nPages, page: 1}))
        .catch(err => console.log(err))
    }

    componentDidUpdate(prevProps, prevState){  
        if(this.state.category === prevState.category && this.state.price.value !== prevState.price.value) {
            axios.get("https://xcommerce-server.herokuapp.com/api/products/filter?price=" + this.state.price.value + "&category=" + this.state.category)
            .then(data => {
                this.setState({products: data.data.data});
            })
            .catch(err => console.log(err))
        } else if(this.state.category !== prevState.category && this.state.price.value === prevState.price.value) {
            axios.get("https://xcommerce-server.herokuapp.com/api/products/filter?price=" + this.state.price.value + "&category=" + this.state.category)
            .then(data => {
                this.setState({products: data.data.data});
            })
            .catch(err => console.log(err))
        }    
        
        if(this.state.page !== prevState.page){
            console.log("page" + this.state.page);
            console.log(prevState.price.value)
            axios.get("http://localhost:6969/api/products/?page=" + this.state.page||"https://xcommerce-server.herokuapp.com/api/products/?page=" + this.state.page)
            .then(data => this.setState({products: data.data.data}))
            .catch(err => console.log(err))
        }

    }

    render() {
        const { products, search, category, price, page, nPages } = this.state;
        const displayProducts =  products ? products.filter(product => product.title.toLowerCase().includes(search)).map(product => 
                <Product product={product} key={product._id}/>
        ) : "Loading..." ;
        return (
            <Grid container>
                <Grid item xs={12} style={{marginBottom: "40px"}}>
                    <Navbar  onChange={this.searchChange} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Filter onChange={this.changeCategory} category={category} price={price.value} changePrice={this.changePrice}/>
                </Grid>
                <Grid item xs={12} md={9} style={{marginBottom: "40px", width:"99%"}}>
                    <Grid container spacing={32}>
                        {displayProducts}
                    </Grid>
                    <Grid item xs={12} style={{textAlign: "center", marginTop: "32px"}}>
                        {
                            page <= 1     
                                ?<KeyboardArrowLeft style={{height: "50px", width: "50px", cursor: "not-allow", color: "grey"}}/>
                                :<KeyboardArrowLeft  onClick={this.previous} style={{height: "50px", width: "50px", cursor: "pointer"}}/>
                        }
                        {
                            page >= nPages
                                ?<KeyboardArrowRight style={{height: "50px", width: "50px", cursor: "not-allow", color: "grey"}}/>
                                :<KeyboardArrowRight onClick={this.next} style={{height: "50px", width: "50px", cursor: "pointer"}}/>
                        }
                        
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
