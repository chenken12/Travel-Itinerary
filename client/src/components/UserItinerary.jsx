import { dateformat } from "../helpers/dateformat";
import "../styles/useItinerary.css";
import { useNavigate } from "react-router-dom";
import EditButton from "./EditButton";
import DeleteItinerary from "./DeleteItinerary";
const UserItinerary = (props) => {
  const navigate = useNavigate();
  // console.log('props itinerary: ', props);
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
      <div className="itinerary-btns">
        <div className="editbtn">
          <EditButton itineraryData={props}/>
        </div>
        <div className="delbtn">
          <DeleteItinerary itineraryData={props}/>
        </div>
        <div className="user_button">
          <div className="editpin">
            <i className="fas fa-map-marker-alt fa-2x" onClick={() => editpin()}></i>
          </div>
          <div className="viewpins">
            <i className="fas fa-binoculars fa-2x" onClick={() => viewpin()}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItinerary;