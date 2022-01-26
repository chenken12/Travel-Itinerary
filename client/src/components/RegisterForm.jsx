import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterForm() {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });
    const [cookies, setCookie] = useCookies(['user']);

    let navigate = useNavigate();

    useEffect(() => {
        if (cookies.user && cookies.user.id) {

            navigate("/");
        }
    }, [cookies, navigate]);


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log("This is the name and value", name, value);
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!user.firstName || !user.lastName || !user.email || !user.password || !user.passwordConfirmation) {
            toast.error("You need to fill out all sections of the form to register for an account!");
        }

        if (user.password !== user.passwordConfirmation) {
            toast.error("Error!! Password Confirmation does not match password!");
        }

        if (user.firstName && user.lastName && user.email && user.password && user.passwordConfirmation) {
            axios.post("http://localhost:8080/api/register", user)
                .then((response) => {
                    console.log("This is the response for user registration axios post", response);
                    if (response.data.length < 1) {
                        toast.error("Please enter a valid input");
                        return
                    }
                    if (user.password !== user.passwordConfirmation) {
                        toast.error("Error!! Password Confirmation does not match password!");
                        return
                    }
                    else {
                        console.log("This is the response.data", response.data);
                        setCookie('user', {
                            id: response.data.response.id,
                            firstName: response.data.response.first_name,
                            lastName: response.data.response.last_name,
                            email: response.data.response.email
                        }, { path: '/' })

                        navigate("/");
                    }
                })
        }
    }

    return (
        <form className="register-form" onSubmit={handleSubmit}>

            <div className="form-group">
                <label>First Name</label>
                <ToastContainer />
                <input type="text" name="firstName" value={user.firstName} className="form-control" placeholder="First name" onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" value={user.lastName} className="form-control" placeholder="Last name" onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={user.email} className="form-control" placeholder="Enter email" onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" value={user.password} className="form-control" placeholder="Enter password" onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Password Confirmation</label>
                <input type="password" name="passwordConfirmation" value={user.passwordConfirmation} className="form-control" placeholder="Enter password" onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            <p className="forgot-password text-right">
                Already registered <a href="#"><Link to="/login">sign in?</Link> </a>
            </p>
        </form>
    );
}