import React, {useState, useEffect} from 'react';
import '../styles/editItinerary.css';
import {Button, Form, Row, Col} from 'react-bootstrap';
import {useCookies} from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/CreateItinerary.css';
import { useNavigate, useLocation } from 'react-router-dom';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { dateformat } from '../helpers/dateformat';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function EditItinerary() {
  const location = useLocation();
  const [cookies] = useCookies(["user"]);
  const [ error, setError ] = useState('');
  const [userItineraryFormData, SetUserItineraryFormData] = useState({});
  const id_data = location.pathname.split('/')[2];
  console.log("id: ", id_data);
  console.log("cookies:", cookies);


  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    debounce: 500,
    cache: 7 * 24 * 60 * 60
  });

  useEffect(() => {
    axios.get(`/api/travels/${id_data}`)
    .then(res => {
      setValue(res.data.location);
      SetUserItineraryFormData({...res.data});
    })
  }, []);

  const navigate = useNavigate();

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (val) => {
    setValue(val, false);
  };

  const submitForm = function() {
    console.log(userItineraryFormData.users_id);
    if (userItineraryFormData.name === '') {
      setError("Name cannot be blank");
      return;
    } else if (value === '') {
      setError("Location cannot be blank");
      return;
    } else if (userItineraryFormData.startDate === '' || userItineraryFormData.endDate === '') {
      setError("Date cannot be blank");
      return;
    }
     
    const parameter = { address: value };
        
    getGeocode(parameter)
      .then((results) => {
        console.log(results[0])
        return getLatLng(results[0])
      })
      .then((latLng) => {
        const { lat, lng } = latLng;
        // console.log("Coordinates: ", lat, lng);
        return axios.put(`/api/travels/${id_data}`, {...userItineraryFormData, location: value, lat, lng})
      })
      .then((res) => {
        // const edit_id = res.data.itinerary.id;
        navigate(`/usersTravels`)
      })
      .catch((error) => {
        setError("Location error");
        console.log("Error: ", error);
      });
  }
  const renderSuggestions = () => {
    const suggestions = data.map(({ place_id, description }) => (
      <ComboboxOption key={place_id} value={description} />
    ));

    return (
      <>
        {suggestions}
        <li className="logo">
          <img
            src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
            alt="Powered by Google"
          />
        </li>
      </>
    );
  };
  console.log("User Itinerary form data: ", userItineraryFormData);
  console.log("User Itinerary form data startdate: ", userItineraryFormData.startDate);
  console.log("User Itinerary form data enddate: ", userItineraryFormData.endDate);
  const startDate = userItineraryFormData.travel_start_date ? new Date(userItineraryFormData.travel_start_date): "";
  const endDate = userItineraryFormData.travel_end_date ? new Date(userItineraryFormData.travel_end_date) : "";
  console.log("formatted start date: ", startDate);
  return (
    <Form xs={1} method="PUT" onSubmit={ event => {
      event.preventDefault();
      submitForm();
    }}>
    <h1>Create Itinerary</h1>
    <Form.Group className="mb-3">
      <Form.Label>Name</Form.Label>
      <Form.Control 
        type="name" 
        defaultValue={userItineraryFormData.name}
        selected={userItineraryFormData.name} 
        onChange={event => {
          SetUserItineraryFormData({...userItineraryFormData, name: event.target.value});
        }} />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Location</Form.Label>
      <Combobox onSelect={handleSelect} aria-labelledby="demo">
        <ComboboxInput
          style={{ width: 300, maxWidth: "90%" }}
          value={value}
          onChange={handleInput}
          disabled={!ready}
        />
        <ComboboxPopover>
          <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Where</Form.Label>
      <Row>
        <Form.Group as={Col} controlId='formGridStartDate'>
          <Form.Label>Start Date </Form.Label>
          <DatePicker 
            // value={userItineraryFormData.travel_start_date}
            selected={startDate} 
            onChange={date => SetUserItineraryFormData({...userItineraryFormData, travel_start_date: date})}
            dateFormat='dd/MM/yyyy'
            maxDate={userItineraryFormData.travel_end_date}
          />
        </Form.Group>
        <Form.Group as={Col} controlId='formGridEndDate'>
          <Form.Label>End Date </Form.Label>
          <DatePicker 
            selected={endDate} 
            onChange={date => SetUserItineraryFormData({...userItineraryFormData, travel_end_date: date})}
            dateFormat='dd/MM/yyyy'
            minDate={userItineraryFormData.travel_start_date}
          />
        </Form.Group>
      </Row>
    </Form.Group>
    <Form.Group className='mb-3'>
      <Form.Label>
        Description
      </Form.Label>
      <Form.Control 
        type='text' 
        as='textarea' 
        rows={3} 
        defaultValue={userItineraryFormData.description}
        selected={userItineraryFormData.description} 
        onChange={event => SetUserItineraryFormData({...userItineraryFormData, description: event.target.value})}>
      </Form.Control>
    </Form.Group>
    <Button variant="flat" type="submit">
      Submit
    </Button>
    <section className="error_msg" style={{ color: "red" }}>{error}</section>
  </Form>
  );
}