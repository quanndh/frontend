import React, { Component } from 'react';
import {Grid} from "@material-ui/core";
import NavbarSmall from "../components/NavbarSmall";
import Footers from "../components/Footer";
import SignupForm from "../components/SignupForm";

class Signup extends Component {
    componentDidMount(){
        window.scrollTo(0,0);
    }
    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <NavbarSmall />
                </Grid>
                <Grid item xs={12} style={{paddingTop: "140px", height: "70vh"}}>
                    <SignupForm />
                </Grid>
                <Grid item xs={12} style={{marginTop: "60px"}}>
                    <Footers />
                </Grid>
            </Grid>
        );
    }
}

export default Signup;
