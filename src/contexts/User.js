import React , { Component } from "react";
import axios from "axios";

const UserContext = React.createContext();


class UserProvider extends Component {
    constructor(){
        super();
        this.state = {
            user: {}
        }
        this.getInfo = this.getInfo.bind(this);
    }    

    getInfo(){
        axios.get("http://localhost:6969/api/login/me", {
          withCredentials: true
        })
        .then(data => {
            this.setState({
                user : data.data.message,
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <UserContext.Provider value={{
                getInfo: this.getInfo,
                user: this.state.user
            }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export  {UserProvider, UserContext};