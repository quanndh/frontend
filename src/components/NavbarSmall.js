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

    onClick = e => {
        console.log(e.value);
    }

    render() {
        const {scrollY, searchText} = this.props;
        
        return (
                <Header className="nav" transparent title="ShopCANA" style={{transition: ".22s ease-in",width: "100%",right: "3.5px", position: 'fixed', backgroundColor: scrollY >= 700 ? "black" : ""}}>
                    <Navigation>
                        <Link className="nav-text"  to="/" onClick={this.onClick}>Imported</Link>
                        <Link className="nav-text"  to="/" onClick={this.onClick}>Interior</Link>
                        <Link className="nav-text"  to="/" onClick={this.onClick}>Handmade</Link>
                        <Textfield
                            value={searchText}
                            onChange={this.textChange}
                            label="Search"
                            expandable
                            expandableIcon="search"
                        />
                    </Navigation>
                </Header>
        );
    }
}

export default NavbarSmall;
