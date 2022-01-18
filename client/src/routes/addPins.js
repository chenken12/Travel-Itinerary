import React, { useState, useEffect } from "react";
import axios from "axios";
import {displayMarker, displayMarkerInfo} from '../components/DisplayMap'
import GoogleMapReact from 'google-map-react';
import "../styles/addPins.css"
import Marker from '../components/Marker';
import { useLocation } from 'react-router-dom';

const AddPins = () => {
  const [center, setCenter] = useState({lat: 43.6532, lng: -79.3832 });
  const [zoom, setZoom] = useState(9);
  let [markers, setMarkers] = useState([
    <Marker key={1} lat={43.6532} lng={-79.3832} name="My Marker" color="blue" />,
    <Marker key={2} lat={43.5632} lng={-79.7832} name="My Marker Red" color="red" />
  ]);
  const [markerInfo, setMarkersInfo] = useState();

  const location = useLocation();
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    axios.get(`/api/travels/${id}`)
      .then((marker) => {
        setMarkers(() => [displayMarker(marker.data)]);
        setMarkersInfo(() => [displayMarkerInfo(marker.data)]);
      });
  }, []);

  const addMark = function(lat, lng) {
    setMarkers((prevState) => {
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
          {markers}
          
        </GoogleMapReact>
      </div>
      <button onClick={() => addMark(43.7632, -79.6832)}>Test</button>
      <div className="MarkerInfo-container">
        { markerInfo }
      </div>
    </main>
  );
}

export default AddPins;