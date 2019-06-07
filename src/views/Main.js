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
import { PulseLoader } from 'react-spinners';
import { Empty } from 'antd';
import {UserContext} from "../contexts/User";
import SaleProduct from '../components/SaleProduct';


class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            search: "",
            category: "all",
            price: [5.00, 40.00],
            page: 1,
            nPage: "",
            loading: false,
            user: {},
            sale: {},
            showSale: false
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
        this.setState({
            loading: true,
        })
        window.scrollTo(0,0);

        axios.get("https://xcommerce-server.herokuapp.com/api/products/?page=" + this.state.page )
        .then(data => this.setState({products: data.data.data, nPages: data.data.nPages, loading: false}))
        .catch(err => console.log(err))
    }

    componentDidUpdate(prevProps, prevState){  
        if(this.state.category === prevState.category && !_.isEqual(this.state.price, prevState.price)) {
            this.setState({
                product: [],
                loading: true
            })
            axios.get("https://xcommerce-server.herokuapp.com/api/products/filter/?price=" + this.state.price[0] + "&price2=" + this.state.price[1] +  "&category=" + this.state.category + "&page=" + this.state.page)
            .then(data => {
                this.setState({products: data.data.data, nPage: data.data.nPages, loading: false});
            })
            .catch(err => console.log(err))
        } else if(this.state.category !== prevState.category && _.isEqual(this.state.price, prevState.price)) {
            this.setState({
                product: [],
                loading: true
            })
            console.log(this.state.category)
            axios.get("https://xcommerce-server.herokuapp.com/api/products/filter/?price=" + this.state.price[0] + "&price2=" + this.state.price[1] + "&category=" + this.state.category + "&page=" + this.state.page)
            .then(data => {
                this.setState({products: data.data.data, nPage: data.data.nPages, loading: false});
            })
            .catch(err => console.log(err))
        }    
        
        if(this.state.page !== prevState.page){
            this.setState({
                product: [],
                loading: true
            })
            console.log(prevState.price)
            axios.get("https://xcommerce-server.herokuapp.com/api/products/?page=" + this.state.page)
            .then(data => this.setState({products: data.data.data, nPage: data.data.nPages, loading: false}))
            .catch(err => console.log(err))
        }

        if(prevProps.user !== this.props.user){
            axios.get("https://xcommerce-server.herokuapp.com/api/products/sale", {
                withCredentials: true
            })
            .then(data => this.setState({sale: data.data.data, showSale: true}))
            .catch(err => console.log(err))
        }
    }

    handleCancel = () => {
        this.setState({ showSale: false });
    };
    
    render() {
        const { products, search, category, price, page, nPages, loading, sale, showSale } = this.state;
        console.log(this.props.user)
        console.log(sale)
      
        let displayProducts =  products.filter(product => product.title.toLowerCase().includes(search)).map(product => 
                <Product product={product} key={product._id} handleWarning={this.handleWarning}/>
        ) 
        if(_.isEmpty(displayProducts)){
            displayProducts = (<Empty className='sweet-loading' description="No product found!" />)
        }
        return (
            
         <div style={{width: "100%"}}>
            
            <Navbar onClick={this.clickSearch}  onChange={this.searchChange} />
                <div id="wrapper" style={{paddingBottom: "320px"}}>
                    <SaleProduct style={{width: "100%"}} product={sale} visible={showSale} handleCancel={this.handleCancel} handleOk={this.handleOk}/>
                <div id="bodyWrapper" >
                    <AdsBanner style={{paddingTop: "-200px"}}/>
                    <Grid container>
                        <Grid item xs={12} md={3} className="bg">
                            <Filter onChange={this.changeCategory} category={category} price={price} changePrice={this.changePrice}/>
                        </Grid>
                        <Grid className="bg" id="Product" item xs={12} md={9} style={{marginBottom: "40px", width:"99%", minHeight: "700px"}}>
                            <Grid container  style={{minHeight: "700px"}}>
                                
                                { loading !== true && displayProducts}

                                { loading === true && (<div className='sweet-loading'>
                                                        <PulseLoader
                                                        sizeUnit={"px"}
                                                        size={40}
                                                        color={'#000'}
                                                        loading={loading}
                                                        />
                                                    </div> )}
                                                    
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
                    </Grid>
                   
                </div>
                <Footers />
            </div>
        </div>

        );
    }
}

Main.contextType = UserContext;
export default Main;
