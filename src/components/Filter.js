import React, { Component } from 'react';
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel} from "@material-ui/core"
class Filter extends Component {
    handleChange = event => {
        this.props.onChange(event.target.value);
      };
    render() {
        return (
            <FormControl component="fieldset" >
                <FormLabel component="legend">Category</FormLabel>
                <RadioGroup
                    aria-label="category"
                    name="category"
                    value={this.props.value}
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
        );
    }
}

export default Filter;
