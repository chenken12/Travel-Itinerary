import React from 'react';
import { useNavigate } from "react-router-dom";

const EditButton = (props) => {
  const navigate = useNavigate();
  console.log("Edit btn props: ", props);
  return (
    <div>
      <button onClick={() => navigate(`/editItinerary/${props.itineraryData.id}`)}>Edit Itinerary</button>
    </div>
  )
};

export default EditButton;
