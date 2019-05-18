import React, { Component } from 'react';
import {Grid} from "@material-ui/core";
import LoginForm from '../components/LoginForm';
import NavbarSmall from "../components/NavbarSmall";
import Footers from "../components/Footer";

class Login extends Component {
    render() {
        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <NavbarSmall />
                </Grid>
                <Grid item xs={12} style={{marginTop: "160px", marginBottom: "120px"}}>
                    <LoginForm />
                </Grid>
                <Grid item xs={12} style={{marginTop: "40px"}}>
                    <Footers />
                </Grid>
            </Grid>
        );
    }
}

export default Login;
