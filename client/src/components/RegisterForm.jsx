import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class RegisterForm extends Component {
    render() {
        return (
            <form className="register-form">

                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Password Confirmation</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#"><Link to="/login">sign in?</Link> </a>
                </p>
            </form>
        );
    }
}