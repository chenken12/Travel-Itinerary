import { useState } from 'react';
import './App.css';
import useApplicationData from './hooks/useApplicationData';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import LoginForm from './components/LoginForm';
import PropTypes from 'prop-types';
import NavBar from './components/navBar';

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

  // if (!token) {
  //   return <LoginForm setToken={setToken} />
  // }


  return (
    <div className="App">
      <ul className="test"> {userList} </ul>
      <button onClick={() => handleRouteClick("/addPins/1")} type="button">Add Pins page</button>
      <button onClick={() => handleRouteClick("/usersTravels")} type="button">usersTravels page</button>

      <h1> Users </h1>
    </div>
  );
 
};

export default App;
