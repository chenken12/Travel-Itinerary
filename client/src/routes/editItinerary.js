import React, {useState, useEffect} from 'react';
import {Button, Form, Row, Col} from 'react-bootstrap';
import {useCookies} from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/CreateItinerary.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function EditItinerary() {
  const location = useLocation();
  const [cookies] = useCookies(["user"]);
  const [formData, setFormData] = useState({
    users_id: cookies.user.id,
    name: "",
    description: "",
    city: "",
    country: "US",
    startDate: "",
    endDate: ""
  });
  const [userItineraryFormData, SetUserItineraryFormData] = useState({});
  const id_data = location.pathname.split('/')[2];
  console.log("id: ", id_data);
  console.log("cookies:", cookies);

  useEffect(() => {
    axios.get(`/api/travels/${id_data}`)
    .then(res => SetUserItineraryFormData({...res.data}))
  }, []);

  console.log("User Itinerary form data: ", userItineraryFormData);
  const navigate = useNavigate();

  return(
    <Form xs={1} method="PUT" onSubmit={ event => {
      event.preventDefault();
        axios.post(`http://localhost:8080/api/travels`, userItineraryFormData)
        .then(() => {
          console.log("user Itinerary: ",);
          navigate('/usersTravels')
        })
      }}>
      <h1>Create Itinerary</h1>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control 
          type="name" 
          value={userItineraryFormData.name}
          selected={formData.name} 
          onChange={event => {
            setFormData({...formData, name: event.target.value});
          }} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control 
        type="name" 
        value={userItineraryFormData.city_name}
        selected={formData.city} 
        onChange={event => setFormData({...formData, city: event.target.value})} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Select 
        defaultValue="Choose..." 
        value={userItineraryFormData.country_name}
        selected={formData.country} 
        onChange={event => setFormData({...formData, country: event.target.value})}>
          <option>US</option>
          <option>Canada</option>
          <option>United Kingdom</option>
          <option>Germany</option>
          <option>France</option>
          <option>Egypt</option>
          <option>Australia</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Where</Form.Label>
        <Row>
          <Form.Group as={Col} controlId='formGridStartDate'>
            <Form.Label>Start Date </Form.Label>
            <DatePicker 
              selected={formData.startDate} 
              value={userItineraryFormData.travel_start_date}
              onChange={date => setFormData({...formData, startDate: date})}
              dateFormat='dd/MM/yyyy'
            />
          </Form.Group>
          <Form.Group as={Col} controlId='formGridEndDate'>
            <Form.Label>End Date </Form.Label>
            <DatePicker 
              selected={formData.endDate} 
              value={userItineraryFormData.travel_end_date}
              onChange={date => setFormData({...formData, endDate: date})}
              dateFormat='dd/MM/yyyy'
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
          value={userItineraryFormData.description}
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