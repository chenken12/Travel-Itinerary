import { dateformat } from "../helpers/dateformat";
import "../styles/useItinerary.css";
import { useNavigate } from "react-router-dom";
import EditButton from "./EditButton";
import DeleteItinerary from "./DeleteItinerary";
const UserItinerary = (props) => {
  const navigate = useNavigate();
  const {name, description, location, travel_start_date, travel_end_date} = props;
  return (
    <div className="user-travels-page"> 
      <h1>{location}</h1>
      <p>{description}</p>
      <h3>{name}</h3>
      <div>
        <span>{dateformat(travel_start_date)}</span>
        <span>-</span>
        <span>{dateformat(travel_end_date)}</span>
      </div>
      <EditButton itineraryData={props}/>
      <DeleteItinerary itineraryData={props}/>
    </div>
  );
};

export default UserItinerary;