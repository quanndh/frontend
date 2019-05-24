import React, { Component } from 'react';

class AdsBanner extends Component {
    render() {
        return (
            <a href="/signup" class="banner banner--gradient-bg">
                <div class="banner__logo-wrapper">
                    <i class="fi fi-codepen"></i>
                </div>
                <div>
                    <div class="banner__title">HOT SALE</div>
                    <div class="banner__text">Become a member of ShopCANA to receive sale code and huge prices for the first 200!</div>
                </div>
                <div class="banner__cta">
                    SIGN UP
                </div>
            </a>

        );
    }
}

export default AdsBanner;
