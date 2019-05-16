import React, { Component } from 'react';
import { Layout, Content, Drawer, Navigation } from 'react-mdl';
import NavbarSmall from './NavbarSmall';
import { Link } from "react-router-dom";


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: 0,
            searchText: "",
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
        this.setState({searchText: text})
    }

    render() {
        const { scrollY, searchText } = this.state;
        console.log(searchText);
        return (
                <div className="navbar" style={{height: '100vh'}}>
                    <Layout  style={{}}>
                        <NavbarSmall scrollY={scrollY} onChange={this.onChange} />
                        <Drawer style={{position: "fixed"}} className="drawer">
                            <Navigation>
                                <Link to="/imported">Imported</Link>
                                <Link to="/">Interior</Link>
                                <Link to="/">Handmade</Link>
                            </Navigation>
                        </Drawer>
                        <Content style={{display: "flex", justifyContent: "center", alignItems: "center", color: "white"}}>
                            <div style={{maxWidth: "50%"}}>
                                <h2 style={{textAlign: "center"}}>WHY DRINK AND DRIVE, WHILE YOU CAN SMOKE AND TRAVEL</h2>
                            
                                <p style={{paddingTop: "20px", wordWrap: "break-word", textAlign: "center"}}>LOVE IS A SMOKE MADE WITH THE FUME OF SIGHS</p>
                            </div>
                        </Content>
                    </Layout>       
                </div>
                
            
        );
    }
}

export default Navbar;
