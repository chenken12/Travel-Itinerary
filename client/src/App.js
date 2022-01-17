import { useState } from 'react';
import './App.css';
import useApplicationData from './hooks/useApplicationData';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";

const App = () => {

  const navigate = useNavigate();

  const {
      state,
      dispatch
  } = useApplicationData();
  const handleRouteClick = (path = '/') => {
    navigate(path);
  }
    const userList = state.users.map((user) => (<li key={user.id} > {user.first_name} {user.last_name} {user.email} </li>
));


return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>positronX.io</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
              </li>
              <li>
              <Link className="nav-link" to={"/newItinerary"}>Create Itinerary</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      <ul className="test"> {userList} </ul>
  {/* <Link to="/login">Invoices</Link> |{" "}
  <Link to="/register">Expenses</Link> */}
  <button onClick={() => handleRouteClick("/addPins")} type="button">Add Pins page</button>
  <button onClick={() => handleRouteClick("/usersTravels")} type="button">usersTravels page</button>
      <h1> Users </h1>
        <ul> {userList} </ul>
      
    </div>
  
  // <div className="App" >
//   <h1> Users </h1>

//   <ul> {userList} </ul>
//   {/* <Link to="/login">Invoices</Link> |{" "}
//   <Link to="/register">Expenses</Link> */}
// </div >
);
};

export default App;
