import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import {displayMarker, displayMarkerInfo} from '../helpers/displayMap'
import MarkerInfo from '../components/MarkerInfo';
import Comment from '../components/Comment'
import "../styles/viewOtherItinerary.css"
import { useLocation } from 'react-router-dom';

export default function ViewOtherItinerary(props) {
  const [center, setCenter] = useState({lat: 43.6532, lng: -79.3832 });
  const [zoom, setZoom] = useState(13);
  const [markers, setMarkers] = useState();
  const [markerInfo, setMarkersInfo] = useState();
  const [comments, setComments] = useState();

  const location = useLocation();
  const id = location.pathname.split('/')[2];

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
      setMarkers(() => [displayMarker(first.data)]);
      setMarkersInfo(() => [displayMarkerInfo(first.data)]);
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
        { markerInfo }
      </div>
      <div className="CommentInfo">
        { comments }
      </div>
    </main>
  );
}