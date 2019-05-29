import React, { Component } from 'react';
import { Tabs } from "antd";
import { Slider } from "antd";
import { Typography } from 'antd';
import { Grid } from "@material-ui/core";

const { Paragraph  } = Typography;

const TabPane = Tabs.TabPane;


class Filter extends Component {
    handleChange = key => { 
      this.props.onChange(key);
    };

    filterPrice = (value) => { 
      console.log(value)  
      this.props.changePrice( value );
    };

    
    
    render() {
        const { category, price } = this.props;
        return (
            
            <Grid container style={{height: "350px", width: "90%", marginLeft: "14px"}}>
              <Grid item xs={12} style={{display: "flex", justifyContent: "flex-start" }}>
                 <Tabs style={{fontSize: "28px", height: "auto"}} defaultActiveKey={category} onChange={this.handleChange} tabPosition="right" size="large">
                    <TabPane tab="All" key="all"/>
                    <TabPane tab="Armada" key="Armada" />
                    <TabPane tab="Blood" key="Blood" />
                    <TabPane tab="Camel" key="Camel" />
                    <TabPane tab="Captain Black" key="Captain Black" />
                    <TabPane tab="Marlboro" key="Marlboro" />                
                    <TabPane tab="Muratti" key="Muratti"/>
                   
              
                </Tabs>
              </Grid>
               
              <Grid item xs={12} style={{marginTop: "70px", marginBottom: "200px"}}>
                <div style={{fontSize: "24px", fontWeight: "200" ,marginBottom: "20px", paddingLeft: "10px"}}>
                  <Paragraph>Price: ${price[0]} - ${price[1]}</Paragraph >
                </div>


                <div>
                  <Slider 
                  min={5.00} 
                  max={40.00} 
                  range defaultValue={price} 
                  disabled={false} 
                  step={5.00} 
                  onChange={this.filterPrice}
                  />
                </div >
              </Grid>

               
            </Grid>
                


            
        );
    }
}

export default Filter;
