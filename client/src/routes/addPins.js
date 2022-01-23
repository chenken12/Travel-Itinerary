import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import Marker from '../components/Marker';
import { useLocation } from 'react-router-dom';
import "../styles/viewOtherItinerary.css"
import DatePicker from 'react-datepicker';
import { getDatesArr, getDate, timezoneOffset } from "../helpers/dateformat";
import MarkerInfoList from "../components/MarkerInfoList";
import Traveldetails from "../components/Traveldetails";

const AddPins = () => {
  const [center, setCenter] = useState({ lat: 43.6532, lng: -79.3832 });
  const [zoom, setZoom] = useState(11);
  const [date, setDate] = useState('');
  const [travel, setTravel] = useState({});
  const [markerList, setMarkerList] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [error, setError] = useState("");
  const [newPlace, setNewPlace] = useState({
    name: '', lat: null, lng: null 
  });

  const location = useLocation();
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    Promise.all([
      axios.get(`/api/pins/${id}`),
      axios.get(`/api/travels/${id}`),
    ]).then((all) => {
        const [ first, second ] = all;
        setMarkerList([...first.data]);
        setTravel({...second.data});
        setDateList([...getDatesArr(new Date(second.data.travel_start_date), new Date(second.data.travel_end_date))]);
      })
      .catch(error => console.log("Error: " + error));
  }, []);

  const parsedMarker = markerList.map((marker) => {
    return <Marker key={`marker${marker.id}`} lat={marker.lat} lng={marker.long} name={marker.pinned_name} color="blue" />;
  });
  const parsedDays = dateList.map((day, index) => {
    return <MarkerInfoList key={ index } day={`${getDate(day)}`} markerList={markerList}/>
  });

  const addMarker = function(lat, lng) {
    setError("");
    setNewPlace((prev) => {
      return { ...prev, lat: lat, lng: lng };
    });
  };

  const setMarker = function() {
    if (newPlace.name === "") {
      setError("Name cannot be blank");
      return;
    }
    if (newPlace.lat === null || newPlace.lng === null) {
      setError("No marker was placed");
      return;
    }  
    if (date === '') {
      setError("No date was selected");
      return;
    }  

    setError("");
    axios.post(`/api/pins/`, { id, ...newPlace, date })
      .then((res) => {
        setMarkerList((prev) => {
          return [...prev, { id: `${markerList.length}n`, travel_destination_id: id, pinned_name: newPlace.name, lat: newPlace.lat, long: newPlace.lng,  date: `${new Date(date).toISOString()} `} ]
        });
        setNewPlace({ name: '', lat: null, lng: null });
      })
      .catch(error => console.log("Error"));
  };

  return (
    <main className="map-container">
      <div className="text-container">
        <Traveldetails 
          {...travel}
        />
   
        <form className="marker-form">
          <h3>Add Pins to Itinerary</h3>
          <input 
            name="name"
            type="text"
            placeholder="Name the Place"

            value={ newPlace.name }
            onChange={(event) => setNewPlace((prev) => {
              return {...prev, name: event.target.value};
            })}
          />
          <DatePicker 
            selected={date} 
            onChange={(event) => setDate(event)}
            dateFormat='dd/MM/yyyy'
            placeholderText="02/01/2022"
            minDate={timezoneOffset(new Date(travel.travel_start_date))}
            maxDate={timezoneOffset(new Date(travel.travel_end_date))}
          />
          <section className="error_msg" style={{ color: "red" }}>{error}</section>
          <button type="button" className="btn" onClick={() => setMarker()}>Save</button>
          <button type="button" className="btn" onClick={() => addMarker(null, null)}>Cancel</button>
          
        </form>
        
        <div className="markerInfo-container">
          <h3>Places</h3>
          { parsedDays }
        </div>


      </div>
      <div className="google_map_container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPKEY }}
          defaultCenter={center}
          defaultZoom={zoom}
          onClick={(event) => addMarker(event.lat, event.lng)}
        >
          { parsedMarker }
          {newPlace.lat && <Marker key={"newPlaceMarker"} lat={newPlace.lat} lng={newPlace.lng} name={newPlace.name} color="green" />}
          
        </GoogleMapReact>
      </div>
 
    </main>

  );
}

export default AddPins;