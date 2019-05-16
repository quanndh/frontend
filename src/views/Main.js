import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Footers from '../components/Footer';
import Product from '../components/Product';

class Main extends Component {
    render() {
        return (
            <div>
                <Navbar/>

                Filter

                <Product/>
                
               <Footers className=""/>
                
            </div>
        );
    }
}

export default Main;
