import React, { Component } from 'react';
import { Header, Navigation, Textfield} from 'react-mdl';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';

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
        const { searchText} = this.props;
        
        return (
                <Header className="nav" transparent title="ShopCANA" style={{transition: ".22s ease-in",width: "100%",right: "3.5px", position: 'fixed', backgroundColor: "black",  background: "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7))"}}>
                    
                    <Navigation>
                        <Link className="nav-text"  to="/" >Home</Link>
                        <Link className="nav-text"  to="/cart">
                            <IconButton aria-label="Cart">
                                <Badge badgeContent={4} color="primary">
                                    <ShoppingCartOutlinedIcon style={{color: "white"}}/>
                                </Badge>
                            </IconButton>
                        </Link>
                        <Link className="nav-text"  to="/login" >Login</Link>
                        
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
