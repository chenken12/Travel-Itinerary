import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { Redirect } from "request/lib/redirect";
import { useNavigate } from "react-router-dom";
import { Redirect } from "react-router";

export default function LoginForm(props) {

    const [user, setUser] = useState({
        email: "", 
        password: ""
    });

    let navigate = useNavigate();


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user, [name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!user.email || !user.password) {
            alert("You need to enter the email and password to login!!");
        }

        if (user.email && user.password) {
            axios.post("http://localhost:8080/api/login", user)
                .then((response) => {
                    console.log("This is the response for login axios post", response);
                    if (response.data.length < 1 ){
                        alert("Please enter a valid username or password");
                        return 
                    } else {
                        navigate("/");
                    }
                    // if(response.data.length > 0) {
                    //     navigate("/");
                    // }
                })
        }
    }
        return (
            <div className="login-wrapper">
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value={user.email} className="form-control" placeholder="Enter email" onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={user.password} className="form-control" placeholder="Enter password" onChange={handleChange}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Don't have an account yet? <a href="#"><Link to="/register">Register Here</Link> </a>
                </p>
            </form>
            </div>
        );
}

