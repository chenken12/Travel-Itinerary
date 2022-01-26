import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import "../styles/viewOtherItinerary.css"
import { useLocation } from 'react-router-dom';
import Comments from "../components/Comment";
import Marker from '../components/Marker';
import {dateformat} from "../helpers/dateformat";
import MarkerInfoList from "../components/MarkerInfoList";
import { getDatesArr, getDate } from "../helpers/dateformat";
import Traveldetails from "../components/Traveldetails";
import useComment from "../hooks/useComment";
import { ToastContainer, toast } from 'react-toastify';

export default function ViewOtherItinerary(props) {
  const location = useLocation();
  const td_id = location.pathname.split('/')[2];

  const [center, setCenter] = useState({lat: 43.6532, lng: -79.3832 });
  const [zoom, setZoom] = useState(9);
  const [markerList, setMarkerList] = useState([]);
  const { comment, postComment, setPost } = useComment(td_id, toast);
  const [travel, setTravel] = useState({});
  const [dateList, setDateList] = useState([]);
 
  useEffect(() => {
    Promise.all([
      axios.get(`/api/pins/${td_id}`),
      axios.get(`/api/travels/${td_id}`),
    ]).then((all) => {
      const [ first, second ] = all;
      setMarkerList([...first.data]);
      setTravel({...second.data});
      setDateList([...getDatesArr(new Date(second.data.travel_start_date), new Date(second.data.travel_end_date))]);
      setCenter({ lat: second.data.lat, lng: second.data.lng });
    });
  }, [td_id]);

  const parsedMarker = markerList.map((marker, index) => {
    return <Marker key={`marker${marker.id}`} lat={marker.lat} lng={marker.long} name={marker.pinned_name} color="blue" index={index} />;
  });
  const parsedDays = dateList.map((day, index) => {
    const markerfilter = markerList.filter((marker) =>{ 
      return getDate(day) === dateformat(marker.date);
    }); 
    if (markerfilter.length > 0) {
      return <MarkerInfoList key={ index } day={`${getDate(day)}`} color="blue" markerList={markerList}/>
    }
    return null;
  });

  const parsedComment = comment.list.map((comment) => {
    return <Comments 
      key={`comment${comment.id}`} 
      text={comment.comment} 
      time={dateformat(comment.created_at)} 
      name={`${comment.first_name} ${comment.last_name}`} 
    />;
  });

  return (
    <main className="map-container">
      <ToastContainer />
      <div className="text-container">
        <Traveldetails 
          {...travel}
        />

        <h2>View Other People's Itinerary</h2>

        <div className="markerInfo-container">
          <h3>Places</h3>
          { parsedDays }
        </div>

      
        <div className="comment-container">
          <h3>Comment</h3>
          <form className="comment-form">
            <section className="error_msg" style={{ color: "red" }}>{comment.error}</section>
            <input 
              name="comment"
              type="text"
              placeholder="Post a comment"

              value={ comment.post }
              onChange={(event) => setPost(event.target.value)}
            />
            <button type="button" onClick={() => postComment()}>Comment</button>
          </form>

          { parsedComment }
        </div>
      </div>
      
      <div className="google_map_container"> 
        <GoogleMapReact
          center={center}
          defaultZoom={zoom}
        >
          {parsedMarker}
          
        </GoogleMapReact>
      </div>
    </main>

  );
}
