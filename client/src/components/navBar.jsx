import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav, Form, FormControl, Button } from "react-bootstrap";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

export default function NavBar(props) {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, removeCookie] = useCookies(['user']);

  const {user = {}} = cookies;
  console.log("This is the user----", user);
  const {firstName} = user;

  let navigate = useNavigate();
  console.log("This is the cookiiess----", cookies);

  // useEffect(() => {
  //   axios.get("http://localhost:8080/api/login/get_login").then((response) => {
  //     console.log("This is the responseeee----", response)
  //   })
  // }, [])
  const handleLogout = (e) => {
    e.preventDefault();
    removeCookie('user', { path: '/' } );
    navigate("/");
  }

  return (

    <div className="nav-style">
      <Navbar bg="dark" variant="dark" fixed-top="true">

        <Container>
          <Navbar.Brand href="/">Travel Itinerary</Navbar.Brand>
          <Nav className="me-auto">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/usersTravels"}>My Travels</Link>
                </li>
                {!firstName && (
                <><li className="nav-item">
                  <Link className="nav-link" to={"/login"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/register"}>Signup</Link>
                </li></>)}
                <li className="nav-item">
                  <Link className="nav-link" to={"/newItinerary"}>New Itinerary</Link>
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
            &nbsp
            {firstName && (<Navbar.Text> Signed in as: <a href="#login">{firstName}</a> </Navbar.Text>)}
            &nbsp &nbsp
            {firstName && (<button onClick={handleLogout}>Logout</button> )}
            
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
