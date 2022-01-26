import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav, Form, FormControl, Button } from "react-bootstrap";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import "../styles/navBar.css"

export default function NavBar(props) {

  const [cookies, removeCookie] = useCookies(['user']);

  const { user = {} } = cookies;
  console.log("This is the user----", user);
  const { firstName } = user;

  let navigate = useNavigate();
  console.log("This is the cookiiess----", cookies);

  // useEffect(() => {
  //   axios.get("http://localhost:8080/api/login/get_login").then((response) => {
  //     console.log("This is the responseeee----", response)
  //   })
  // }, [])
  const handleLogout = (e) => {
    e.preventDefault();
    removeCookie('user');
    navigate("/");
  }

  return (
    <nav className="nav-style">
      <Navbar bg="dark" variant="dark" fixed-top="true">
        <Container>
          <Navbar.Brand href="/">Travel Itinerary</Navbar.Brand>
          <Nav className="me-auto">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                {firstName && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/usersTravels"}>My Travels</Link>
                    </li></>)}
                <li className="nav-item">
                  <Link className="nav-link" to={"/newItinerary"}>New Itinerary&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>
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
            <span> </span>
            {firstName && (<Navbar.Text> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signed in as: <a href="#login">{firstName}</a></Navbar.Text>)}
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            {firstName && (<button onClick={handleLogout}>Logout</button>)}
            <ul className="navbar-nav ml-auto">
              {!firstName && (
                <><li className="nav-item">
                  <Link className="nav-link" to={"/login"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login</Link>
                  
                </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/register"}>Signup</Link>
                  </li></>)}
            </ul>
          </Nav>
        </Container>
      </Navbar>
    </nav>
  );
}
