import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import "../styles/addPins.css"
import Marker from '../components/Marker';

const AddPins = () => {
  const [center, setCenter] = useState({lat: 43.6532, lng: -79.3832 });
  const [zoom, setZoom] = useState(9);
  let [markerList, setMarkerList] = useState([
    <Marker key={1} lat={43.6532} lng={-79.3832} name="My Marker" color="blue" />,
    <Marker key={2} lat={43.5632} lng={-79.7832} name="My Marker Red" color="red" />
  ]);

  const addMark = function(lat, lng) {
    setMarkerList((prevState) => {
      return [...prevState,
        <Marker lat={lat} lng={lng} name="My Marker" color="blue" cursor='pointer' />
      ];
    });
  };

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Add Pins to Itinerary</h2>
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPKEY }}
          defaultCenter={center}
          defaultZoom={zoom}
          onClick={(event) => {
            console.log("latitide = ", event.lat);
            console.log("longitude = ", event.lng);
            addMark(event.lat, event.lng);
          }}
        >
          {markerList}
          
        </GoogleMapReact>
      </div>
      <button onClick={() => addMark(43.7632, -79.6832)}>Test</button>
    </main>
  );
}

export default AddPins;