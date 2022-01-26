import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import "../styles/navBar.css"
import "../index.css"

export default function NavBar(props) {

  const [cookies, removeCookie] = useCookies(['user']);

  const { user = {} } = cookies;
  const { firstName } = user;

  let navigate = useNavigate();

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
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {firstName && (
                <><li className="nav-item">
                  <Link className="nav-link" to={"/usersTravels"}>My Travels</Link>
                </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/newItinerary"}>New Itinerary</Link>
                  </li>
                </>)}
            </ul>
          </div>
          <div className="collapse navbar-coll">
            <div className="collapse nav-log">
              <div className="signed-in">{firstName && (<Navbar.Text> Signed in as: <a href="#login">{firstName}</a></Navbar.Text>)}</div>
              <div>{firstName && (<button onClick={handleLogout}>Logout</button>)}</div>
            </div>
            <ul className="navbar-nav ml-auto">
              {!firstName && (
                <><li className="nav-item">
                  <Link className="nav-link" to={"/login"}>Login</Link>
                </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/register"}>Signup</Link>
                  </li></>)}
            </ul>
          </div>
        </Container>
      </Navbar>
    </nav>
  );
}
