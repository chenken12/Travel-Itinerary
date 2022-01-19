import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';



export default function LoginForm() {
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();

    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     const token = await loginUser({
    //       email,
    //       password
    //     });
    //     setToken(token);
    //   }
      
    // render() {
        return (

            <div className="login-wrapper">
            <form>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" 
                    className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password"  
                    className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Don't have an account yet? <a href="#"><Link to="/register">Register Here</Link> </a>
                </p>
            </form>
            </div>
        );
    // }
}

// LoginForm.propTypes = {
//     setToken: PropTypes.func.isRequired
// }

