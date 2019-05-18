import React, { Component } from 'react';
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Paper} from "@material-ui/core"
import {Slider} from "@material-ui/lab";
import {defaultValueReducer} from "@material-ui/lab/Slider"

function valueReducer(rawValue, props, event) {
    const { disabled, max, min, step } = props;
  
    function roundToStep(number) {
      return Math.round(number / step) * step;
    }
  
    if (!disabled && step) {
      if (rawValue > min && rawValue < max) {
        if (rawValue === max - step) {
          // If moving the Slider using arrow keys and value is formerly an maximum edge value
          return roundToStep(rawValue + step / 2);
        }
        if (rawValue === min + step) {
          // Same for minimum edge value
          return roundToStep(rawValue - step / 2);
        }
        return roundToStep(rawValue);
      }
      return rawValue;
    }
  
    return defaultValueReducer(rawValue, props, event);
}

class Filter extends Component {
    handleChange = event => {
        this.props.onChange(event.target.value);
    };

    filterPrice = (e,value) => {   
        this.props.changePrice({ value });
    };

    
    
    render() {
        const { category, price } = this.props;
        return (
            <Paper style={{height: "500px", width: "90%", marginLeft: "14px"}}>
                <FormControl component="fieldset" style={{marginBottom: "50px"}}>
                    <FormLabel component="legend" style={{fontSize: "28px" ,marginTop:"10"}}>Category</FormLabel>
                    <RadioGroup
                        aria-label="category"
                        name="category"
                        value={category}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel
                        value="imported"
                        control={<Radio color="primary" />}
                        label="Imported"
                        labelPlacement="start"
                        />
                        <FormControlLabel
                        value="interior"
                        control={<Radio color="primary" />}
                        label="Interior"
                        labelPlacement="start"
                        />
                        <FormControlLabel
                        value="handmade"
                        control={<Radio color="primary" />}
                        label="Handmade"
                        labelPlacement="start"
                        />
                    </RadioGroup>
                </FormControl>

                <FormLabel component="legend" style={{fontSize: "28px", marginBottom: "10px"}}>Price: {price*1} (Highest 1000)</FormLabel>
                <Slider
                value={price*1}
                valueReducer={valueReducer}
                aria-labelledby="label"
                onChange={this.filterPrice}
                min={200}
                max={1000}
                step={100}
                style={{width: "90%", margin: "0 auto"}}
                />
             
            </Paper>
            
        );
    }
}

export default Filter;
