import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav, Form, FormControl, Button } from "react-bootstrap";
import axios from "axios";

export default function NavBar(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { user } = props;

  useEffect(() => {
    axios.get("http://localhost:8080/api/login/get_login").then((response) => {
      console.log("This is the responseeee----", response)
    })
  }, [])


  return (

    <div className="nav-style">
      <p> {props.title} </p>
      <Navbar bg="dark" variant="dark" fixed-top="true">

        <Container>
          <Navbar.Brand href="/">Travel Itinerary</Navbar.Brand>
          <Nav className="me-auto">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/usersTravels"}>My Travels</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/register"}>Register for an Account</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/newItinerary"}>Create an Itinerary</Link>
                </li>
              </ul>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </div>
            &nbsp&nbsp
            <Navbar.Text> Signed in as: <a href="#login">This is a test user</a> </Navbar.Text>
            <button onClick={props.logout}>Logout</button>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
