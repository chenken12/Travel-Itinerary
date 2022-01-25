import { dateformat } from "../helpers/dateformat";
import { useNavigate } from "react-router-dom";
import EditButton from "./EditButton";
const UserItinerary = (props) => {
  const navigate = useNavigate();
  console.log('props itinerary: ', props);
  const {name, description, city_name, country_name, travel_start_date, travel_end_date} = props;
  return (
    <div style={{backgroundColor: "white", color: "black"}}> 
      <h1>{name}</h1>
      <p>{description}</p>
      <h1>{city_name}</h1>
      <h1>{country_name}</h1>
      <h1>{dateformat(travel_start_date)}</h1>
      <h1>{dateformat(travel_end_date)}</h1>
      <EditButton itineraryData={props}/>
      {/* <button onClick={}>Change Pins</button>
      <button onClick={}>Delete Itinerary</button> */}
    </div>
  );
};

export default UserItinerary;