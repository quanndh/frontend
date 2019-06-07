import React, { Component } from 'react';
import {Grid} from "@material-ui/core";
import { Card, Statistic } from "antd";

class Statistics extends Component {
    render() {
        const { data } = this.props;
        return (
            <Grid item xs={12} style={{maxWidth: "70%", paddingBottom: "20px"}}>
                <Card className="statistic" style={{border: "1.3px solid black", borderRadius: "4px"}}>
                    <Statistic 
                        value={data.title  + ": "+ data.value}
                        style={{fontSize: "18px", color: "black"}}
                    />  
                </Card>
            </Grid>
        );
    }
}

export default Statistics;
