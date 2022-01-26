import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteItinerary = (props) => {
  const {itineraryData} = props;
  const navigate = useNavigate();
  console.log("Delete Itinerary props: ", {...itineraryData});
  return (
    <div>
      <i className='fas fa-trash fa-2x' onClick={() =>
        axios.post(`/api/travels/${props.itineraryData.id}`, {...itineraryData})
          .then(() => navigate('/'))}></i>
    </div>
  )
};

export default DeleteItinerary;
