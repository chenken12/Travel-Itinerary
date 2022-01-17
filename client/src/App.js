import { useState } from 'react';
import './App.css';
import { Link, useNavigate } from "react-router-dom";
import useApplicationData from './hooks/useApplicationData';


const App = () => {
  const navigate = useNavigate();
  const {
      state,
      dispatch
  } = useApplicationData();

  const handleRouteClick = (path = '/') => {
    navigate(path);
  }
  
  const userList = state.users.map((user) => (<li key={user.id} > {user.first_name} {user.last_name} {user.email} </li>));

return (
  <div>
   
    <ul className="test"> {userList} </ul>
    {/* <Link to="/login">Invoices</Link> |{" "}
    <Link to="/register">Expenses</Link> */}
    <button onClick={() => handleRouteClick("/addPins")} type="button">Add Pins page</button>
    <button onClick={() => handleRouteClick("/usersTravels")} type="button">usersTravels page</button>
  </div>
);
};

export default App;
