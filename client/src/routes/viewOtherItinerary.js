import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import Marker from '../components/Marker';
import Comment from '../components/Comment'
import "../styles/viewOtherItinerary.css"
import { useLocation } from 'react-router-dom';

export default function ViewOtherItinerary(props) {
  const [center, setCenter] = useState({lat: 43.6532, lng: -79.3832 });
  const [zoom, setZoom] = useState(13);
  let [markers, setMarkers] = useState();
  let [comments, setComments] = useState();

  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const parsedMarkers = function(markers) {
    return markers.map((marker) => {
      return(
        <Marker 
          key={"marker"+marker.id} 
          lat={marker.lat} 
          lng={marker.long} 
          name={marker.pinned_name} 
          color="blue" 
        />
      )
    });
  };

  const parsedComments = function(comments) {
    return comments.map((comment) => {
      return(
        <Comment 
          key={"comment"+comment.id} 
          text={comment.comment} 
          time={comment.created_at} 
          name={`${comment.first_name} ${comment.last_name}`} 
        />
      )
    });
  };

  useEffect(() => {
    // const location = useLocation();
    Promise.all([
      axios.get(`/api/travels/${id}`),
      axios.get(`/api/comments/${id}`)
    ]).then((all) => {
      const [ first, second ] = all;
      setMarkers(() => [parsedMarkers(first.data)]);
      setComments(() => [parsedComments(second.data)]);
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
          {markers}
          
        </GoogleMapReact>
      </div>
      <div className="MarkerInfo">
        {comments}
      </div>
    </main>
  );
}