import { dateformat } from "../helpers/dateformat";
import { useNavigate } from "react-router-dom";
import EditButton from "./EditButton";
const UserItinerary = (props) => {
  const navigate = useNavigate();
  // console.log('props itinerary: ', props);
  const {name, description, location, travel_start_date, travel_end_date} = props;
  return (
    <div className="user-travels-page" style={{backgroundColor: "white", color: "black"}}> 
      <h1>{name}</h1>
      <p>{description}</p>
      <h1>{location}</h1>
      <h1>{dateformat(travel_start_date)}</h1>
      <h1>{dateformat(travel_end_date)}</h1>
      <EditButton itineraryData={props}/>
      {/* <button onClick={}>Change Pins</button>
      <button onClick={}>Delete Itinerary</button> */}
    </div>
  );
};

export default UserItinerary;