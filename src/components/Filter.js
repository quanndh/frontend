import React, { Component } from 'react';
import { Tabs } from "antd";
import { Slider } from "antd";
import { Typography } from 'antd';

const { Paragraph  } = Typography;

const TabPane = Tabs.TabPane;


class Filter extends Component {
    handleChange = key => {
      console.log(key)  
      this.props.onChange(key);
    };

    filterPrice = (value) => { 
      console.log(value)  
      this.props.changePrice( value );
    };

    
    
    render() {
        const { category, price } = this.props;
        return (
            <div style={{height: "500px", width: "90%", marginLeft: "14px"}}>

                <Tabs style={{fontSize: "28px", height: "220px"}} defaultActiveKey={category} onChange={this.handleChange} tabPosition="left" size="large">
                    <TabPane tab="All" key="all" style={{fontSize: "24px", fontWeight: "200"}}>
                      All
                    </TabPane>
                    <TabPane tab="Imported" key="imported" style={{fontSize: "24px", fontWeight: "200"}}>
                     Imported
                    </TabPane>
                    <TabPane tab="Interior" key="interior" style={{fontSize: "24px", fontWeight: "200"}}>
                      Interior
                    </TabPane>
                </Tabs>

                <div style={{fontSize: "24px", fontWeight: "200" ,marginBottom: "20px", paddingTop: "40px", paddingLeft: "10px"}}>
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
                </div>
             
            </div>

            
        );
    }
}

export default Filter;
