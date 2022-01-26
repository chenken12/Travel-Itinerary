import { dateformat } from "../helpers/dateformat";
import "../styles/useItinerary.css";
import { useNavigate } from "react-router-dom";
import EditButton from "./EditButton";
import DeleteItinerary from "./DeleteItinerary";
const UserItinerary = (props) => {
  const navigate = useNavigate();
  const {name, description, location, travel_start_date, travel_end_date} = props;
  console.log(props.id);
  const editpin = function() {
    navigate(`/edit/${props.id}`);
  }
  const viewpin = function() {
    navigate(`/view/${props.id}`);
  }

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
      <div className="user_button">
        <EditButton itineraryData={props}/>
        <DeleteItinerary itineraryData={props}/>
        <button onClick={() => editpin()}>Edit Pins</button>
        <button onClick={() => viewpin()}>View Pins</button>
      </div>
     
    </div>
  );
};

export default UserItinerary;