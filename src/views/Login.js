import React, { Component } from 'react';
import {Grid} from "@material-ui/core";
import LoginForm from '../components/LoginForm';
import NavbarSmall from "../components/NavbarSmall";
import Footers from "../components/Footer";

class Login extends Component {
    componentDidMount(){
        window.scrollTo(0,0);
    }
    render() {
        return (
            <Grid container>
                <Grid item xs={12} >
                    <NavbarSmall />
                </Grid>
                <Grid item xs={12} style={{paddingTop: "130px", height: "70vh"}}>
                    <LoginForm />
                </Grid>
                <Grid item xs={12} >
                    <Footers />
                </Grid>
            </Grid>
        );
    }
}

export default Login;
