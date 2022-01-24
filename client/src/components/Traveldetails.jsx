import React from "react";

const Traveldetails = (props) => {
  const { name, city_name, country_name, description, travel_start_date, travel_end_date } = props;
  return (
    <div className='text-box'>
      <p> Title: { name } </p>
      <p> Location: { city_name }, { country_name } </p>
      <p> { description } </p>
      <p> Duration: { travel_start_date } to { travel_end_date } </p>
    </div>
  );
};

export default Traveldetails;