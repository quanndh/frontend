import React, { Component } from 'react';
import {Link} from "react-router-dom";
class AdsBanner extends Component {
    render() {
        return (
            <div class="banner banner--gradient-bg">
                <div class="banner__logo-wrapper">
                    <i class="fi fi-codepen"></i>
                </div>
                <div>
                    <div class="banner__title">HOT SALE</div>
                    <div class="banner__text">Become a member of ShopCANA to receive promotion code and huge prices for the first 200!</div>
                </div>
                <Link class="banner__cta" to="/signup">
                    <div >
                        SIGN UP
                    </div>
                </Link>
                
            </div>

        );
    }
}

export default AdsBanner;
