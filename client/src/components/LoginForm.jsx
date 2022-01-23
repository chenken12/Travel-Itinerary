import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Redirect } from "react-router";
import { useCookies } from 'react-cookie';


export default function LoginForm(props) {
  const [user, setUser] = useState({
    email: "", 
    password: ""
  });
  const [cookies, setCookie] = useCookies(['user']);
  
  let navigate = useNavigate();

  useEffect(() => {
    if (cookies.user) {
      navigate("/");
    }
  }, []);

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
      axios.post("/api/login", user)
        .then((response) => {
          console.log("This is the response for login axios post", response.data);
          if (response.data.error){
            alert("Please enter a valid input");
            return 
          } 

          else {
            console.log(response.data.response);
            setCookie('user',  { 
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
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" value={cookies.email} className="form-control" placeholder="Enter email" onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={cookies.password} className="form-control" placeholder="Enter password" onChange={handleChange}/>
        </div>

        <button type="submit" className="btn btn-primary btn-block">Submit</button>
        <p className="forgot-password text-right">
          Don't have an account yet? <a href="#"><Link to="/register">Register Here</Link> </a>
        </p>

      </form>
    </div>
  );
};
