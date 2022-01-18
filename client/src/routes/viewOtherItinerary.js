import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import Marker from '../components/Marker';
import "../styles/viewOtherItinerary.css"
import NavBar from "../components/navBar";

export default function ViewOtherItinerary() {
  const [center, setCenter] = useState({lat: 43.6532, lng: -79.3832 });
  const [zoom, setZoom] = useState(9);
  let [markerList, setMarkerList] = useState([
    <Marker key={1} lat={43.6532} lng={-79.3832} name="My Marker" color="blue" />,
    <Marker key={2} lat={43.5632} lng={-79.7832} name="My Marker Red" color="red" />
  ]);

  console.log("P:" + window.location.pathname);

  return (
    <main style={{ padding: "1rem 0" }}>
      <NavBar />
      <h2>View Other People's Itinerary</h2>
      <div className="view_others_map"> 
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPKEY }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {markerList}
          
        </GoogleMapReact>
      </div>
    </main>
  );
}