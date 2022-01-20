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
    lat: null,
    lng: null
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
    setNewPlace((prev) => {
      return {
        ...prev,
        lat: lat,
        lng: lng
      };
    })
  };

  const setMarker = function(lat, lng) {
    const index = `${markerList.marker.length + 1}`;
    axios.post(`/api/pins/`, { id, ...newPlace })
      .then((res) => {
        console.log("res:" + JSON.stringify(res));
        setMarkerList((prev) => {
          return {
            marker: [...prev.marker, <Marker key={`marker${index}n`} lat={newPlace.lat} lng={newPlace.lng} name={newPlace.name} color="blue" />],
            info: [...prev.info, <MarkerInfo key={`markerinfo${index}n`} name={newPlace.name} index={ index }/>]
          };
        });
        setNewPlace({ name: '', lat: null, lng: null });
      })
      .catch(error => console.log("Error"));

  };

  return (
    <main className="map-container">
      <div className="text-container">
        <h2>Add Pins to Itinerary</h2>

        <button onClick={() => addMarker(null, null)}>Reset</button>

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
          <a>lat: {newPlace.lat}</a>
          <a>lng: {newPlace.lng}</a>
          <button type="button" className="btn" onClick={() => setMarker(null, null)}>Add Pin</button>
          
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
          onClick={(event) => addMarker(event.lat, event.lng)}
        >
          { markerList.marker }
          {newPlace.lat && <Marker key={"newPlaceMarker"} lat={newPlace.lat} lng={newPlace.lng} name={newPlace.name} color="green" />}
          
        </GoogleMapReact>
      </div>
 
    </main>

  );
}

export default AddPins;