import React, { Component } from 'react';
import Footers from '../components/Footer';
import NavbarSmall from "../components/NavbarSmall";
import {Grid} from "@material-ui/core";
import axios from "axios";
import Statistics from "../components/Statistic";
import { Card, Statistic } from "antd";
import { Collapse } from 'antd';
import Order from '../components/Order';
import _ from "lodash";
import { Empty } from 'antd';


const Panel = Collapse.Panel;

class OrderDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            statistic: [],
            fav: "",
            ordered: [],
            key: 0
        }
    }

    componentDidMount() {
        axios.get("https://xcommerce-server.herokuapp.com/api/order/" + this.props.user.email, {
            withCredentials: true
        })
        .then(data => {
            this.setState({
                statistic: data.data.statistic,
                fav: data.data.fav,
                ordered: data.data.data
            })
        }).catch(err => console.log(err))
    }

    showOrder = (key) => {
        console.log(key)
        this.setState({key: key})
    }
    render() {
        const { fav, ordered } = this.state;

        const displayOrdered = ordered.map((item, index) => 
                <Panel header={"Order: " + index} key={index + 1}>
                    <Order data={item.orderedItems} />
                </Panel>
      )

        const displayData = this.state.statistic.map((item, index) => <Statistics key={index} data={item}/>)
        return (
            <div id="wrapper">
                <NavbarSmall />
                <div id="bodyWrapper" style={{paddingBottom: "500px"}}>
                    <div>
                    <Grid container>
                        <Grid item xs={4} style={{width: "90%"}}>
                            <h2 style={{marginLeft: "15%"}}>Statistics</h2>
                            <Grid container style={{display : "flex", justifyContent: "center"}}>
                                <Grid item style={{width: "70%", paddingBottom: "20px"}}>
                                    <Card className="statistic" style={{border: "1.3px solid black", borderRadius: "4px"}}>
                                        <Statistic 
                                            value={"Favorite brand: "+ fav}
                                            style={{fontSize: "18px", color: "black", width: "85%"}}
                                        />  
                                    </Card>
                                </Grid>
                                {displayData}
                            </Grid>
                        </Grid>
                        <Grid item xs={8} style={{maxWidth: "61%"}}>
                            <h2 >Your orders</h2>
                            <Collapse defaultActiveKey={[this.state.key]} onChange={this.showOrder}>
                                {!_.isEmpty(ordered) && displayOrdered}
                                {_.isEmpty(ordered) && <Empty className='sweet-loading' description="No order yet!" />}
                            </Collapse>
                        </Grid>
                        
                    </Grid>
                    </div>
                    
                </div>
                <Footers />
            </div>
        );
    }
}

export default OrderDetail;
