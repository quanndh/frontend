import React, { Component } from 'react';
import NavbarSmall from "../components/NavbarSmall";
import Footers from "../components/Footer"
import { Grid} from "@material-ui/core";
import axios from "axios";
import {CartContext} from "../contexts/Cart";
import _ from "lodash";
import {Button} from "antd";
import { UserContext } from '../contexts/User';
import { Modal } from 'antd';
import { PulseLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 20px auto;
    border-color: red;
`;


function warning() {
    Modal.warning({
      title: 'Warning',
      content: 'Please login before add to cart.',
      centered: true
    });
  }

class ProductDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: {},
            products: []
        }
    }
    componentWillMount() {
        window.scrollTo(0,0);
        axios.get( `https://xcommerce-server.herokuapp.com/api/products/${this.props.match.params.productid}`)
            .then(data => {
                console.log(data.data.data)
                this.setState({
                    product: data.data.data,
                })
                axios.get("https://xcommerce-server.herokuapp.com/api/products/category/" + data.data.data.category)
                .then(data => {
                    this.setState({
                        products: data.data.data
                    })
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.error(err))
    }

    render() {
        const { product, products } = this.state;
        const discription = product.discription ? product.discription : "";
        let discriptionText = discription.split("/");
        const recommend = !_.isEmpty(products) ? products.map(product => (
            <Grid item xs={2} key={product._id} style={{ margin: "10px"}}>
                <a href={`/products/${product._id}`}  style={{textDecoration: "none", textDecorationColor: "none"}}>
                    <img className="small-img" src={product.imageUrl} alt="" style={{ padding: "4px",width: "120px", height: "150px"}}/>
                </a>
            </Grid>
        )) : (<div className='sweet-loading'>
                <PulseLoader
                css={override}
                sizeUnit={"px"}
                size={40}
                color={'#000'}
                loading={true}
                />
            </div> )
        return (
            <Grid container spacing={16} >
                <Grid item xs={12}>
                    <NavbarSmall />
                </Grid>
                <Grid item xs={12} style={{margin: "120px auto 0", maxWidth: "70vw", borderBottom: "2px solid black"}}>
                    <Grid container style={{ display: "flex", justifyContent: "center"}}>
                        <Grid item xs={6} style={{width: "70%", height: "100%"}}>
                            <img src={product.imageUrl} alt="" style={{width: "55%", height: "100%"}}/>
                        </Grid>
                        <Grid item xs={6}>
                            <h1>{product.title}</h1>
                            {discriptionText.map((text, index) => <h5 key={index}>{text}</h5>)}
                            <h5>${product.price}</h5>
                            <CartContext.Consumer>
                                {
                                    ({addToCart}) => (
                                        <Button type="primary" ghost onClick={() => {
                                            if(_.isEmpty(this.context.user)){
                                               warning();
                                            } else {
                                                addToCart(product)
                                            }}}>
                                            ADD TO CART
                                        </Button> 
                                    )
                                }
                            </CartContext.Consumer>
                            
                            
                        </Grid>
                    </Grid>
                    
                </Grid>

                <Grid item xs={12} style={{margin: "0 auto", maxWidth: "70vw"}}>
                    <h5>Product you may want to see:</h5>
                    <Grid container>
                        {recommend}
                    </Grid>
                </Grid>

                <Grid item xs={12} style={{marginTop: "43px"}}>
                    <Footers />
                </Grid>
            </Grid>
                
            
        );
    }
}

ProductDetail.contextType = UserContext;
export default ProductDetail;
