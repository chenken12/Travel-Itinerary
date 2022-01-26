import React from 'react';
import { useNavigate } from "react-router-dom";

const EditButton = (props) => {
  const navigate = useNavigate();
  console.log("Edit btn props: ", props);
  return (
    <div>
      <i className='fas fa-pen fa-2x' onClick={() => navigate(`/editItinerary/${props.itineraryData.id}`)}></i>
    </div>
  )
};

export default EditButton;
