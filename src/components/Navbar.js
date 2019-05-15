import React, { Component } from 'react';
import { Layout, Content, Drawer, Navigation} from 'react-mdl';
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
            <div>
                <div style={{height: '100vh', position: 'relative'}}>
                    <Layout style={{background: 'url(https://hdqwalls.com/download/smoking-beard-man-1920x1080.jpg) center / cover'}}>
                        <NavbarSmall scrollY={scrollY} onChange={this.onChange} />
                        <Drawer style={{position: "fixed"}} className="toolbar">
                            <Navigation>
                                <Link to="/imported">Imported</Link>
                                <Link to="/">Interior</Link>
                                <Link to="/">Handmade</Link>
                            </Navigation>
                        </Drawer>
                        <Content style={{display: "flex", justifyContent: "center", alignItems: "center", color: "white"}}>
                            <div style={{maxWidth: "50%"}}>
                                 <h2 style={{textAlign: "center"}}>asdasdasdasdasd</h2>
                            
                                <p style={{paddingTop: "20px", wordWrap: "break-word", textAlign: "center"}}>ahihihihasfwefiuwgjdewbiwegbafsegfdhearhreahharehreharhtsrhjarehatewrigbfigbewiugbaiugbrigbgifdbguiebgufdgbiwbgwuivbuirhwgifdhbuigrwuigreiugheiuihihihihihihihi</p>
                            </div>
                        </Content>
                    </Layout>
                </div>
                <div>
                    <img alt="" className="layer" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgICAgHBwcHBwcHBwoHBwcHBw8ICQcKFREWFhURExMYHSggGBolGxMTITEhJSkrOi4uFx8zODMsNygtLisBCgoKDQ0NDw0NDi0ZFRkrKy0rKzcrKy0tNzctLSsrKy0tKystKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBLAMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAVEAEBAAAAAAAAAAAAAAAAAAAAAf/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwDDgEaAFQAAAAARQAABUAAAAAAAEUAAAAAVAAAAAAAAAAUAEAUVBQEAEAAABQAQAAAAAFABAAAAAAAAAAAAUAAAEAAUBFBAABQBQARAAUAAAAAAABAAAAAAAAAAAAUAEAAAEUAABVEAAVFQAAQUBAFBUEFQAAFAAQAFABAAAAUAEABQARUURUVFUEUQQBUFRUUAAQAAVRBQEAEAAFQRQBUAAAAAAAAAAAAUBFRUFFAQQBRRBAAVFQBQABUEFQFAAABAAVAAAAAAAAAAAAAAAIAKCKgCgCggAAAgAKCiCCgIAoAAACAAAAAAAAoAIAAqLUFABFARUAVFARUFAQVFAABUAUQQVFAQBQAEAAAEUAVAAAAAAFqAKqQqoAAIAoAAoggoACKlAAVAAAAUAAAABUEAUAAABAAAABUEUVFUgUKioKioqKIIKAIqAAoCKgACoAAACgAiiCKAAAKAAgAAACoAACAAKAKKAgAAIAKACAAAKgAAAKAIAAACoACgAAAgAK//2Q==" />
                </div>
            </div>
            
        );
    }
}

export default Navbar;
