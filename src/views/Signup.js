import React, { Component } from 'react';
import {Grid} from "@material-ui/core";
import NavbarSmall from "../components/NavbarSmall";
import Footers from "../components/Footer";
import SignupForm from "../components/SignupForm";

class Signup extends Component {
    render() {
        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <NavbarSmall />
                </Grid>
                <Grid item xs={12} style={{marginTop: "160px", marginBottom: "120px"}}>
                    <SignupForm />
                </Grid>
                <Grid item xs={12} style={{marginTop: "40px"}}>
                    <Footers />
                </Grid>
            </Grid>
        );
    }
}

export default Signup;
