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
            
            <Grid container style={{height: "500px", width: "90%", marginLeft: "14px"}}>
              <Grid item xs={12} style={{display: "flex", justifyContent: "center" }}>
                 <Tabs style={{fontSize: "28px", height: "220px"}} defaultActiveKey={category} onChange={this.handleChange} tabPosition="right" size="large">
                    <TabPane tab="All" key="all" >
                     
                    </TabPane>
                    <TabPane tab="Imported" key="imported">
                     
                    </TabPane>
                    <TabPane tab="Interior" key="interior" >
                    
                    </TabPane>
                </Tabs>
              </Grid>
               
              <Grid item xs={12}>
                <div style={{fontSize: "24px", fontWeight: "200" ,marginBottom: "20px", paddingLeft: "10px"}}>
                  <Paragraph>Price: {price[0]} - {price[1]}</Paragraph >
                </div>


                <div>
                  <Slider 
                  min={200} 
                  max={1000} 
                  range defaultValue={price} 
                  disabled={false} 
                  step={100} 
                  onChange={this.filterPrice}
                  />
                </div >
              </Grid>

               
            </Grid>
                


            
        );
    }
}

export default Filter;
