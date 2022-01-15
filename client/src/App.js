import { useState } from 'react';
import './App.css';
import useApplicationData from './hooks/useApplicationData';
import GoogleMapReact from 'google-map-react';
import Marker from './components/Marker';

const App = () => {
  const [center, setCenter] = useState({lat: 43.6532, lng: -79.3832 });
  const [zoom, setZoom] = useState(11);

  const {
      state,
      dispatch
  } = useApplicationData();
    const userList = state.users.map((user) => (<li key={user.id} > {user.first_name} {user.last_name} {user.email} </li>
));
return (
  <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_MAPKEY }}
      defaultCenter={center}
      defaultZoom={zoom}
    >
      <Marker
        lat={43.6532}
        lng={-79.3832}
        name="My Marker"
        color="blue"
      />
    </GoogleMapReact>
  </div>
);
};

export default App;
