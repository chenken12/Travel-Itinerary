import React, {useState} from 'react';
import {Button, Form, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/CreateItinerary.css';
export default function CreateItinerary() {
  const state = {
    name: "",
    description: "",
    city: "",
    country: "US",
    startDate: "",
    endDate: ""
  }

  const [formData, setFormData] = useState(state);
  return(
    <Form xs={1} method="POST" onSubmit={ event => {
      event.preventDefault();
      axios.post('api/travels', formData)
        .then(res => res.rows[0])
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
        <Form.Label>City</Form.Label>
        <Form.Control 
        type="name" 
        placeholder="Enter city"
        selected={formData.city} 
        onChange={event => setFormData({...formData, city: event.target.value})} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Select 
        defaultValue="Choose..." 
        placeholder="Enter Country"
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
              onChange={date => setFormData({...formData, startDate: date})}
              dateFormat='dd/MM/yyyy'
            />
          </Form.Group>
          <Form.Group as={Col} controlId='formGridEndDate'>
            <Form.Label>End Date </Form.Label>
            <DatePicker 
              selected={formData.endDate} 
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