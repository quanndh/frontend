import React, { Component } from 'react';
import { Layout, Content, Drawer, Navigation } from 'react-mdl';
import NavbarSmall from './NavbarSmall';
import { Link } from "react-router-dom";


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // scrollY: 0,
        }
        this.onChange = this.onChange.bind(this);

    }
    

    onChange(text){
        this.props.onChange(text);
    }

    onClick = text => this.props.onClick(text);
    render() {
      
        return (
                <div className="navbar" style={{height: '100vh'}}>
                    <Layout  style={{}}>
                        <NavbarSmall  onChange={this.onChange} />
                        <Drawer style={{position: "fixed"}} className="drawer">
                            <Navigation>
                                <Link to="/" >Home</Link>
                                <Link to="/cart" >Cart</Link>
                                <Link to="/login" >Login</Link>
                            </Navigation>
                        </Drawer>
                        <Content style={{display: "flex", justifyContent: "center", alignItems: "center", color: "white"}}>
                            <div style={{maxWidth: "50%", fontSize: "28px"}}>
                                <h2 style={{textAlign: "center"}}>WHY DRINK AND DRIVE, WHILE YOU CAN SMOKE AND TRAVEL</h2>
                            
                                <p style={{paddingTop: "20px", wordWrap: "break-word",fontSize: "20px", textAlign: "center"}}>LOVE IS A SMOKE MADE WITH THE FUME OF SIGHS</p>
                            </div>
                        </Content>
                    </Layout>       
                </div>
                
            
        );
    }
}

export default Navbar;
