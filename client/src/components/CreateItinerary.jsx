import React, { useState, useEffect } from 'react';
import {Button, Form, Row, Col} from 'react-bootstrap';
import {useCookies} from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/CreateItinerary.css';
import { useNavigate } from 'react-router-dom';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function CreateItinerary(props) {
  const { toast } = props;
  const [cookies] = useCookies(["user"]);
  const [formData, setFormData] = useState({
    users_id: cookies.user.id,
    name: "",
    description: "",
    startDate: "",
    endDate: ""
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    debounce: 500,
    cache: 7 * 24 * 60 * 60
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (val) => {
    setValue(val, false);
  };

  const submitForm = function() {
    console.log(formData.users_id);
    if (formData.name === '') {
      toast.error("Name cannot be blank");
      return;
    } else if (value === '') {
      toast.error("Location cannot be blank");
      return;
    } else if (formData.startDate === '' || formData.endDate === '') {
      toast.error("Date cannot be blank");
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
        return axios.post(`/api/travels`, {...formData, location: value, lat, lng})
      })
      .then((res) => {
        const edit_id = res.data.itinerary.id;
        navigate(`/edit/${edit_id}`)
      })
      .catch((error) => {
        toast.error("Location error");
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

  return(
    <Form xs={1} method="POST" onSubmit={ event => {
        event.preventDefault();
        submitForm();
      }}>
      <h1>Create Itinerary</h1>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control 
          type="name" 
          placeholder="Enter name"
          selected={formData.name} 
          onChange={event => {
            setFormData({...formData, name: event.target.value});
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
            placeholder='Enter location'
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
              selected={formData.startDate} 
              onChange={date => setFormData({...formData, startDate: date})}
              dateFormat='dd/MM/yyyy'
              maxDate={formData.endDate}
            />
          </Form.Group>
          <Form.Group as={Col} controlId='formGridEndDate'>
            <Form.Label>End Date </Form.Label>
            <DatePicker 
              selected={formData.endDate} 
              onChange={date => setFormData({...formData, endDate: date})}
              dateFormat='dd/MM/yyyy'
              minDate={formData.startDate}
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
          selected={formData.description} 
          onChange={event => setFormData({...formData, description: event.target.value})}>
        </Form.Control>
      </Form.Group>
      <Button variant="flat" type="submit">
        Submit
      </Button>
    </Form>
  );
}
