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
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const AddPins = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(9);
  const [cookies] = useCookies(['user']);
  const [date, setDate] = useState('');
  const [travel, setTravel] = useState({});
  const [markerList, setMarkerList] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [newPlace, setNewPlace] = useState({
    name: '', lat: null, lng: null 
  });

  const location = useLocation();
  const id = location.pathname.split('/')[2];
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies.user) {
      navigate("/");
    }

    Promise.all([
      axios.get(`/api/pins/${id}`),
      axios.get(`/api/travels/${id}`),
    ]).then((all) => {
        const [ first, second ] = all;
        if (cookies.user.id !== second.data.users_id) {
          navigate("/");
        }
        setMarkerList([...first.data]);
        setTravel({...second.data});
        setDateList([...getDatesArr(new Date(second.data.travel_start_date), new Date(second.data.travel_end_date))]);
        setCenter({ lat: second.data.lat, lng: second.data.lng });
      })
      .catch(error => console.log("Error: " + error));
  }, [id, cookies, navigate]);

  const parsedMarker = markerList.map((marker, index) => {
    return <Marker key={`marker${marker.id}`} lat={marker.lat} lng={marker.long} name={marker.pinned_name} color="blue" index={index}/>;
  });
  const parsedDays = dateList.map((day, index) => {
    return <MarkerInfoList key={ index } day={`${getDate(day)}`} color="blue" markerList={markerList}/>
  });

  const addMarker = function(lat, lng) {
    setNewPlace((prev) => {
      return { ...prev, lat: lat, lng: lng };
    });
  };

  const setMarker = function() {
    if (newPlace.name === "") {
      toast.error("Name cannot be blank")
      return;
    }
    if (newPlace.lat === null || newPlace.lng === null) {
      toast.error("No marker was placed")
      return;
    }  
    if (date === '') {
      toast.error("No date was selected");
      return;
    }  

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
      <ToastContainer />
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
          // bootstrapURLKeys={{ key: process.env.REACT_APP_MAPKEY }}
          center={center}
          defaultZoom={zoom}
          onClick={(event) => addMarker(event.lat, event.lng)}
        >
          { parsedMarker }
          {newPlace.lat && <Marker key={"newPlaceMarker"} lat={newPlace.lat} lng={newPlace.lng} name={newPlace.name} color="green" index= { -1 }/>}
          
        </GoogleMapReact>
      </div>
 
    </main>

  );
}

export default AddPins;