import { useState } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import useApplicationData from './hooks/useApplicationData';
import GoogleMapReact from 'google-map-react';
import Marker from './components/Marker';

const App = () => {
  const [center, setCenter] = useState({lat: 43.6532, lng: -79.3832 });
  const [zoom, setZoom] = useState(9);

  const {
      state,
      dispatch
  } = useApplicationData();
  
  const userList = state.users.map((user) => (<li key={user.id} > {user.first_name} {user.last_name} {user.email} </li>));

  const markerList = [
    <Marker lat={43.6532} lng={-79.3832} name="My Marker" color="blue" />,
    <Marker lat={43.5632} lng={-79.7832} name="My Marker Red" color="red" />
  ];

return (
  <div style={{ height: '100vh', width: '70%', right: 0}}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_MAPKEY }}
      defaultCenter={center}
      defaultZoom={zoom}
    >
      {...markerList}
      
    </GoogleMapReact>

    <ul> {userList} </ul>
    {/* <Link to="/login">Invoices</Link> |{" "}
    <Link to="/register">Expenses</Link> */}
  </div>
);
};

export default App;
