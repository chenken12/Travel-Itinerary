import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import Marker from '../components/Marker';
import "../styles/viewOtherItinerary.css"
import { useLocation } from 'react-router-dom';

export default function ViewOtherItinerary(props) {
  const [center, setCenter] = useState({lat: 43.6532, lng: -79.3832 });
  const [zoom, setZoom] = useState(13);
  let [markerList, setMarkerList] = useState([
    <Marker key={1} lat={43.6532} lng={-79.3832} name="My Marker" color="blue" />,
    <Marker key={2} lat={43.5632} lng={-79.7832} name="My Marker Red" color="red" />
  ]);

  const location = useLocation();
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    // const location = useLocation();
    Promise.all([
      axios.get(`/api/travels/${id}`),
    ]).then((all) => {
      const [ first ] = all;
      console.log(first.data);
      const parsedMarker = first.data.map((marker) => {return(<Marker key={"marker"+marker.id} lat={marker.lat} lng={marker.long} name={marker.pinned_name} color="blue" />)});
      console.log(parsedMarker[0]);
      setMarkerList((prev) => {
        return [prev, ...parsedMarker]
      })
    });
  }, []);


  return (
    <main style={{ padding: "1rem 0" }}>
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