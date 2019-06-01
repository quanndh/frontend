import React, { Component } from 'react';
import NavbarSmall from "../components/NavbarSmall";
import Footers from "../components/Footer";
import SignupForm from "../components/SignupForm";

class Signup extends Component {
    componentDidMount(){
        window.scrollTo(0,0);
    }
    render() {
        return (
            <div id="wrapper">
                <NavbarSmall />
                <div id="bodyWrapper">
                    <SignupForm />
                </div>
                <Footers />
            </div>
            
        );
    }
}

export default Signup;
