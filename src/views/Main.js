import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Footers from '../components/Footer';
import Product from '../components/Product';
import { Grid } from "@material-ui/core";
import axios from "axios";
import Filter from '../components/Filter';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';
import AdsBanner from '../components/AdsBanner';
import _ from "lodash";
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 20px auto;
    border-color: red;
`;

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            search: "",
            category: "all",
            price: [200, 1000],
            page: 1,
            nPage: "",
            loading: false
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

    changePrice = value => {
        this.setState({price: value})
    }

    clickSearch = () => {
        for (let i = 0; i <= 1120; i += 50) {
            setTimeout(function() {
                window.scrollTo(window.scrollY, i)
            }, i / 3);
          }
        
    }

    componentDidMount(){
        axios.get("https://xcommerce-server.herokuapp.com/api/products/?page=" + this.state.page )
        .then(data => this.setState({products: data.data.data, nPages: data.data.nPages}))
        .catch(err => console.log(err))
    }

    componentDidUpdate(prevProps, prevState){  
        if(this.state.category === prevState.category && !_.isEqual(this.state.price, prevState.price)) {
            this.setState({
                products: []
            })
            axios.get("https://xcommerce-server.herokuapp.com/api/products/filter/?price=" + this.state.price[0] + "&price2=" + this.state.price[1] +  "&category=" + this.state.category + "&page=" + this.state.page)
            .then(data => {
                this.setState({products: data.data.data, nPage: data.data.nPages});
            })
            .catch(err => console.log(err))
        } else if(this.state.category !== prevState.category && _.isEqual(this.state.price, prevState.price)) {
            this.setState({
                products: []
            })
            console.log(this.state.category)
            axios.get("https://xcommerce-server.herokuapp.com/api/products/filter/?price=" + this.state.price[0] + "&price2=" + this.state.price[1] + "&category=" + this.state.category + "&page=" + this.state.page)
            .then(data => {
                this.setState({products: data.data.data, nPage: data.data.nPages});
            })
            .catch(err => console.log(err))
        }    
        
        if(this.state.page !== prevState.page){
            this.setState({
                products: []
            })
            console.log(prevState.price)
            axios.get("https://xcommerce-server.herokuapp.com/api/products/?page=" + this.state.page)
            .then(data => this.setState({products: data.data.data, nPage: data.data.nPages}))
            .catch(err => console.log(err))
        }

    }

    render() {
        const { products, search, category, price, page, nPages } = this.state;
        console.log("Checking ...");
        console.log(products);
        
        products.forEach(product => {
            if (!product.title) {
                console.log(product);
            }
        })
        const displayProducts =  !_.isEmpty(products) ? products.filter(product => product.title.toLowerCase().includes(search)).map(product => 
                <Product product={product} key={product._id}/>
        ) : (<div className='sweet-loading'>
                <ClipLoader
                css={override}
                sizeUnit={"px"}
                size={70}
                color={'#000'}
                loading={true}
                />
            </div> ) ;
        return (
            <Grid container>
                <Grid item xs={12} style={{marginBottom: "40px"}}>
                    <Navbar onClick={this.clickSearch}  onChange={this.searchChange} />
                </Grid>
                <Grid item xs={12} className="bg"> <AdsBanner /></Grid>
                <Grid item xs={12} md={3} className="bg">
                    <Filter onChange={this.changeCategory} category={category} price={price} changePrice={this.changePrice}/>
                </Grid>
                <Grid className="bg" id="Product" item xs={12} md={9} style={{marginBottom: "40px", width:"99%"}}>
                    <Grid container spacing={32}>
                        {displayProducts}
                    </Grid>
                    <Grid item xs={12} style={{textAlign: "center", marginTop: "32px"}}>
                        {
                            page <= 1     
                                ?<KeyboardArrowLeft style={{height: "50px", width: "50px", cursor: "not-allow", color: "grey"}}/>
                                :<KeyboardArrowLeft  onClick={this.previous} style={{height: "50px", width: "50px", cursor: "pointer"}}/>
                        }
                        {page} / {nPages}
                        {
                            page === nPages*1
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
