import React, { Component } from 'react';
import {Input, Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

class LoginForm extends Component {

    render() {
        return (
            <Formik
                onSubmit={(values, { setSubmitting }) => {
                    axios.post("http://localhost:6969/api/login/", {
                        email: values.email,
                        password: values.password
                    }, {
                        withCredentials: true
                    })
                    .then(() => window.location.href = "http://localhost:3000/")
                    .catch(err => console.error(err))
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email()
                        .required('Email is Required'),
                    password: Yup.string()
                        .required('Password is Required'),
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
                            <div style={{display: "flex", justifyContent: "center"}}>     
                                <div style={{display: "flex", "flexDirection" : "column", width: "40%", alignItems: "center",  padding: "16px"}}>
                                    <h3>Welcome to ShopCANA, please login</h3>
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

                                    <Input
                                        style={{width: "75%", marginBottom: "30px", fontSize:"22px"}}
                                        id="password"
                                        type="password"
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
                                    
                                    <h4>If you don't have an account yet, <Link to="/signup" style={{textDecoration: "none"}}>Sign Up</Link></h4>

                                    <Button 
                                        type="submit"
                                        variant="outlined" 
                                        color="inherit" 
                                        style={{width: "120px", height: "40px", fontSize:"18px"}} >
                                        Login
                                    </Button>
                                    
                                </div>                              
                            </div>
                        </form>
                    );
                }}
                </Formik>
        );
                
            
       
    }
}

export default LoginForm;
