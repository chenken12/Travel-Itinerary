import React, {useState} from 'react';
import {Button, Form, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/CreateItinerary.css';


export default function CreateItinerary() {
  const [selectedDate, setDate] = useState(null);
  const [selectedDate2, setDate2] = useState(null);
  return(
    <Form xs={1}>
      <h1>Create Itinerary</h1>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" placeholder="Enter name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control type="name" placeholder="Enter city" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Select defaultValue="Choose..." placeholder="Enter Country">
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
              selected={selectedDate} 
              onChange={date => setDate(date)}
              dateFormat='dd/MM/yyyy'
            />
          </Form.Group>
          <Form.Group as={Col} controlId='formGridEndDate'>
            <Form.Label>End Date </Form.Label>
            <DatePicker 
              selected={selectedDate2} 
              onChange={date => setDate2(date)}
              dateFormat='dd/MM/yyyy'
            />
          </Form.Group>
        </Row>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>
          Details
        </Form.Label>
        <Form.Control type='text' as='textarea' rows={3}>
        </Form.Control>
      </Form.Group>
      <Button variant="flat" type="submit">
        Submit
      </Button>
    </Form>
  );
}