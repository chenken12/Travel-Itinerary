import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import {displayMarker, displayMarkerInfo, displayComments} from '../components/DisplayMap'
import "../styles/viewOtherItinerary.css"
import { useLocation } from 'react-router-dom';
import NavBar from "../components/navBar";
import Comments from "../components/Comment";

export default function ViewOtherItinerary(props) {
  const [center, setCenter] = useState({lat: 43.6532, lng: -79.3832 });
  const [zoom, setZoom] = useState(13);
  const [markers, setMarkers] = useState();
  const [markerInfo, setMarkersInfo] = useState();
  const [comments, setComments] = useState();
  const [sendComment, setSendComment] = useState('');

  const location = useLocation();
  const td_id = location.pathname.split('/')[2];

  useEffect(() => {
    Promise.all([
      axios.get(`/api/travels/${td_id}`),
      axios.get(`/api/comments/${td_id}`)
    ]).then((all) => {
      const [ first, second ] = all;
      console.log(second.data)
      setMarkers(() => [...displayMarker(first.data)]);
      setMarkersInfo(() => [...displayMarkerInfo(first.data)]);
      setComments(() => [...displayComments(second.data)]);
    });
  }, []);

  /* 
    // get user id when sign up page is done
  */
  const postComments = function() {
    const user_id = 1;
    axios.post(`/api/comments/`, { user_id, td_id, sendComment })
      .then(() => {
        setComments((prev) => {
          return [prev, <Comments  
            key={"New-comment" + comments.length} 
            text={sendComment} 
            time={Date().toString()} 
            name={`test ${user_id}`} 
          />]
        })
        setSendComment('');
      })
      .catch(error => console.log("Error"));
  }


  return (
    <main>
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
      <div className="MarkerInfo-container">
        { markerInfo }
      </div>
      <div className="comment-container">
        { comments }
      </div>
    </main>
    <div>
      <NavBar />
      <main className="map-container">
        <div className="text-container">
          <h2>View Other People's Itinerary</h2>

          <div className="markerInfo-container">
            <h3>Places</h3>
            { markerInfo }
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
            { comments }
          </div>
        </div>
        <div className="view_others_map"> 
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAPKEY }}
            defaultCenter={center}
            defaultZoom={zoom}
          >
            {markers}
            
          </GoogleMapReact>
        </div>
        
      </main>
    </div>
  );
}
