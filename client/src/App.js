import { useState, useEffect } from 'react';
import './App.css';
import useApplicationData from './hooks/useApplicationData';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import LoginForm from './components/LoginForm';
import PropTypes from 'prop-types';
import NavBar from './components/navBar';
import axios from 'axios';

const App = () => {

  // const [token, setToken] = useState();


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

      <div className='background-main'>
        <button onClick={() => handleRouteClick("/addPins")} type="button">Add Pins page</button>
        <button onClick={() => handleRouteClick("/usersTravels")} type="button">usersTravels page</button>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>

        <h2>Create Your Itinerary Today!</h2>
        <button onClick={() => handleRouteClick("/newItinerary")} type="button">Create Now</button>
        <br></br><br></br><br></br><br></br><br></br>

        <h2>View Other Itinerary</h2>
        <button onClick={() => handleRouteClick("/viewOtherItinerary/1")} type="button">View</button>
        <br></br><br></br>
        <button onClick={() => handleRouteClick("/viewOtherItinerary/2")} type="button">View</button>
        <br></br><br></br>
        <button onClick={() => handleRouteClick("/viewOtherItinerary/3")} type="button">View</button>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      </div>
    </div>
  );
 
};

export default App;
