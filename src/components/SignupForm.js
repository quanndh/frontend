import React, { Component } from 'react';
import {Input, Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { css } from '@emotion/core';
// First way to import
import { PulseLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 20px auto;
    border-color: red;
`;


class SignupForm extends Component {
    constructor(){
        super();
        this.state = {
            message: "",
            loading: false
        }
    }

    handleSignUp = () => {
        this.setState({
            loading: true
        })
    }
    
    render() {
        return (
            <Formik
                onSubmit={(values, { setSubmitting }) => {
                    axios.post("https://xcommerce-server.herokuapp.com/api/users/", {
                        email: values.email,
                        password: values.password,
                        username: values.username
                    }, {
                        withCredentials: true
                    })
                    .then((res) => {
                        this.setState({
                            loading: false
                        })
                        window.location.href = "https://xcommerce-client.herokuapp.com/login"
                        
                    })
                    .catch(() =>  this.setState({
                        message: "Email is taken",
                        loading: false
                    })) 
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email()
                        .required('Email is required'),
                    password: Yup.string()
                        .min(6, "Password must be more than 6 characters")
                        .required('Password is required'),
                    username: Yup.string()
                        .required("Username is required"),
                })}
            >
                {props => {
                    const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    } = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            <div style={{display: "flex", justifyContent: "center", height: "700px"}}>
                                <div style={{display: "flex", "flexDirection" : "column", width: "40%", alignItems: "center",  padding: "16px"}}>
                                    <h3>New to ShopCANA ? SIGN UP</h3>
                                    <Input
                                        placeholder="Email"
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{width: "75%", marginBottom: "30px", fontSize:"22px"}}
                                        inputProps={{
                                        'aria-label': 'email',
                                        }}
                                        className={
                                            errors.email && touched.email ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {errors.email && touched.email && (
                                        <div className="input-feedback">{errors.email}</div>
                                    )}
                                    {this.state.message && (
                                        <div className="input-feedback">{this.state.message}</div>
                                    )}

                                    <Input
                                        style={{width: "75%", marginBottom: "30px", fontSize:"22px"}}
                                        type="password"
                                        id="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Password"
                                        inputProps={{
                                        'aria-label': 'password',
                                        }}
                                        className={
                                            errors.password && touched.password ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {errors.password && touched.password && (
                                        <div className="input-feedback">{errors.password}</div>
                                    )}

                                    <Input
                                        style={{width: "75%", marginBottom: "30px", fontSize:"22px"}}
                                        id="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Username"
                                        inputProps={{
                                        'aria-label': 'username',
                                        }}
                                        className={
                                            errors.username && touched.username ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {errors.username && touched.username && (
                                        <div className="input-feedback">{errors.username}</div>
                                    )}
                                    
                                    <Button type="submit" 
                                    onClick={this.handleSignUp} 
                                    variant="outlined" 
                                    color="inherit" 
                                    style={{width: "120px", height: "40px", fontSize:"18px"}} >
                                        Sign up
                                    </Button>
                                    
                                    <h4>Already have an account, <Link to="/login" style={{textDecoration: "none"}}>Login</Link></h4>
                                    
                                    <div className='sweet-loading'>
                                        <PulseLoader
                                        css={override}
                                        sizeUnit={"px"}
                                        size={40}
                                        color={'#000'}
                                        loading={this.state.loading}
                                        />
                                    </div> 
                                    
                                </div>
                                
                            </div>

                            
                
                        </form>
                    );
                
                    }
                }
                </Formik>
        );
    }
}

export default SignupForm;

