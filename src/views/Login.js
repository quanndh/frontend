import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import NavbarSmall from "../components/NavbarSmall";
import Footers from "../components/Footer";

class Login extends Component {
    componentDidMount(){
        window.scrollTo(0,0);
    }
    render() {
        return (
            <div id="wrapper">
                <NavbarSmall />
                <div id="bodyWrapper">
                    <LoginForm />
                </div>
                <Footers />
            </div>

        );
    }
}

export default Login;
