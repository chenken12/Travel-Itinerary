import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import "../styles/viewOtherItinerary.css"
import { useLocation } from 'react-router-dom';
import Comments from "../components/Comment";
import Marker from '../components/Marker';
import MarkerInfo from '../components/MarkerInfo';
import {dateformat, getDate} from "../helpers/dateformat";

export default function ViewOtherItinerary(props) {
  const [center, setCenter] = useState({lat: 43.6532, lng: -79.3832 });
  const [zoom, setZoom] = useState(13);
  const [markerList, setMarkerList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [sendComment, setSendComment] = useState('');

  const location = useLocation();
  const td_id = location.pathname.split('/')[2];

  useEffect(() => {
    Promise.all([
      axios.get(`/api/travels/${td_id}`),
      axios.get(`/api/comments/${td_id}`)
    ]).then((all) => {
      const [ first, second ] = all;
      setMarkerList([...first.data]);
      setCommentsList(() => [...second.data]);
    });
  }, []);

  const parsedMarker = markerList.map((marker) => {
    return <Marker key={`marker${marker.id}`} lat={marker.lat} lng={marker.long} name={marker.pinned_name} color="blue" />;
  });
  const parsedInfo = markerList.map((marker, index) => {
    return <MarkerInfo key={`markerinfo${marker.id}`} name={marker.pinned_name} index={ index + 1 }/>;
  });
  const parsedComment = commentsList.map((comment, index) => {
    return <Comments 
      key={`comment${comment.id}`} 
      text={comment.comment} 
      time={dateformat(comment.created_at)} 
      name={`${comment.first_name} ${comment.last_name}`} 
    />;
  });

  /* 
    // get user id when sign up page is done
  */
  const postComments = function() {
    const event = new Date();
    const user_id = 1;
    axios.post(`/api/comments/`, { user_id, td_id, sendComment })
      .then(() => {
        setCommentsList((prev) => {
          return [...prev, {
            id: `comment${commentsList.length}n`,
            users_id: 1, // user id 
            travel_destination_id: td_id,
            comment: sendComment,
            created_at: event.toISOString(),
            first_name: "Test", // user name
            last_name: "CC"
          }]
        })
        setSendComment('');
      })
      .catch(error => console.log("Error"));
  }


  return (
    <div>
      <main className="map-container">
        <div className="text-container">
          <h2>View Other People's Itinerary</h2>

          <div className="markerInfo-container">
            <h3>Places</h3>
            { parsedInfo }
          </div>

        
          <div className="comment-container">
            <h3>Comment</h3>
            <form>
              <input 
                name="comment"
                type="text"
                placeholder="Post a comment"

                value={ sendComment }
                onChange={(event) => setSendComment(event.target.value)}
              />
            
            </form>
            <button onClick={() => postComments()}>Post</button>
            { parsedComment }
          </div>
        </div>
        <div className="google_map_container"> 
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAPKEY }}
            defaultCenter={center}
            defaultZoom={zoom}
          >
            {parsedMarker}
            
          </GoogleMapReact>
        </div>
        
      </main>
    </div>
  );
}
