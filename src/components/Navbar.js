import React, { Component } from 'react';
import { Layout, Content, Drawer, Navigation } from 'react-mdl';
import NavbarSmall from './NavbarSmall';
import { Link } from "react-router-dom";


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: 0,
        }
        this.onChange = this.onChange.bind(this);

    }
    componentDidMount() {
        window.addEventListener("scroll", () => {
            this.setState({
                scrollY: window.scrollY,
            })        
        })
    }   

    onChange(text){
        this.props.onChange(text);
    }

    onClick = text => this.props.onClick(text);
    render() {
        const { scrollY } = this.state;
        return (
                <div className="navbar" style={{height: '100vh'}}>
                    <Layout  style={{}}>
                        <NavbarSmall scrollY={scrollY} onChange={this.onChange} onClick={this.onClick}/>
                        <Drawer style={{position: "fixed"}} className="drawer">
                            <Navigation>
                                <Link to="/" >Imported</Link>
                                <Link to="/" >Interior</Link>
                                <Link to="/" >Handmade</Link>
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
