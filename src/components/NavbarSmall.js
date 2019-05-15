import React, { Component } from 'react';
import { Header, Navigation, Textfield} from 'react-mdl';
import { Link } from "react-router-dom";
class NavbarSmall extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
        this.textChange = this.textChange.bind(this);
    }

    textChange(e){
        this.props.onChange(e.target.value)
    }
    render() {
        const {scrollY, searchText} = this.props;
        
        return (
                <Header className="nav-text" transparent title="ShopCANA" style={{transition: ".22s ease-in", position: 'fixed', backgroundColor: scrollY >= 700 ? "black" : ""}}>
                    <Navigation className="navbar">
                        <Link   to="/imported" >Imported</Link>
                        <Link   to="/" >Interior</Link>
                        <Link   to="/">Handmade</Link>
                        <Textfield
                            value={searchText}
                            onChange={this.textChange}
                            label="Search"
                            expandable
                            expandableIcon="search"
                            style={{outline: ""}}
                        />
                    </Navigation>
                </Header>
                

        );
    }
}

export default NavbarSmall;
