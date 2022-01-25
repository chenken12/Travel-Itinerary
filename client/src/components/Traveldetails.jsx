import React, { useState, useEffect } from "react";
import { dateformat } from "../helpers/dateformat";

const Traveldetails = (props) => {
  const { name, location, description, travel_start_date, travel_end_date } = props;
  const [ date, setDate ] = useState({
    start: '',
    end: ''
  })

  useEffect(() => {
    if (travel_start_date && travel_end_date) {
      setDate({
        start: dateformat(travel_start_date),
        end: dateformat(travel_end_date)
      })
    }
  }, [travel_start_date, travel_end_date]);

  // console.log(travel_start_date);
  return (
    <div className='text-box'>
      <p> Title: { name } </p>
      <p> Location: { location } </p>
      <p> { description } </p>
      <p> Duration: { date.start } to { date.end } </p>
    </div>
  );
};

export default Traveldetails;