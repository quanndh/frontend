import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Footers from '../components/Footer';

class Main extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Footers />
            </div>
        );
    }
}

export default Main;
