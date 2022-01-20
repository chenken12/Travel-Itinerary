import React, { useState, useEffect } from "react";
import axios from "axios";
import {displayMarker, displayMarkerInfo} from '../components/DisplayMap'
import GoogleMapReact from 'google-map-react';
import Marker from '../components/Marker';
import MarkerInfo from '../components/MarkerInfo';
import { useLocation } from 'react-router-dom';
import "../styles/viewOtherItinerary.css"

const AddPins = () => {
  const [center, setCenter] = useState({ lat: 43.6532, lng: -79.3832 });
  const [zoom, setZoom] = useState(9);
  let [markerList, setMarkerList] = useState({
    marker: [],
    info: []
  });
  const [newPlace, setNewPlace] = useState({
    name: '',
    lat: 7,
    lng: 25
  });

  const location = useLocation();
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    axios.get(`/api/travels/${id}`)
      .then((marker) => {
        setMarkerList(() => {
          return { 
            marker: [...displayMarker(marker.data)],
            info: [...displayMarkerInfo(marker.data)]
          };
        });
      });
  }, []);

  const addMarker = function(lat, lng) {
    const index = `${markerList.marker.length + 1}`;
    setMarkerList((prev) => {
      console.log(prev);
      return {
        marker: [...prev.marker, <Marker key={"marker" + index} lat={lat} lng={lng} name="My Marker" color="blue" />],
        info: [...prev.info, <MarkerInfo key={"markerinfo" + index} name="My Marker" index={ index }/>]
      };
    });
  };

  return (
    <main className="map-container">
      <div className="text-container">
        <h2>Add Pins to Itinerary</h2>

        <button onClick={() => addMarker(43.7632, -79.6832)}>Test</button>

        <form className="marker-form">
          <input 
            name="name"
            type="text"
            placeholder="Name the Place"

            value={ newPlace.name }
            onChange={(event) => setNewPlace((prev) => {
              return {...prev, name: event.target.value};
            })}
          />
          <a>lat {newPlace.lat}</a>
          <a>lng {newPlace.lng}</a>
          <button type="button" className="btn">Add Pin</button>
          
        </form>
        
        <div className="markerInfo-container">
          <h3>Places</h3>
          { markerList.info }
        </div>

      </div>
      <div className="view_others_map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPKEY }}
          defaultCenter={center}
          defaultZoom={zoom}
          onClick={(event) => {
            console.log("latitide = ", event.lat);
            console.log("longitude = ", event.lng);
            addMarker(event.lat, event.lng);
          }}
        >
          { markerList.marker }
          
        </GoogleMapReact>
      </div>
 
    </main>

  );
}

export default AddPins;