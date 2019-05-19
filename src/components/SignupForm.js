import React, { Component } from 'react';
import {Input, Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';

class SignupForm extends Component {
    render() {
        return (
            <Formik
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    }, 500);
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email()
                        .required('Email is required'),
                    password: Yup.string()
                        .min(6, "Password must be more than 6 characters")
                        .required('Password is required'),
                    username: Yup.string()
                        .required("Username is required")
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
                                    
                                    <h4>Already have an account, <Link to="/login" style={{textDecoration: "none"}}>Login</Link></h4>

                                    <Button type="submit" variant="outlined" color="inherit" style={{width: "120px", height: "40px", fontSize:"18px"}} >
                                        Sign up
                                    </Button>
                                    
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
