import { dateformat } from "../helpers/dateformat";
import "../styles/useItinerary.css";
import { useNavigate } from "react-router-dom";
import EditButton from "./EditButton";
import DeleteItinerary from "./DeleteItinerary";
const UserItinerary = (props) => {
  const navigate = useNavigate();
  // console.log('props itinerary: ', props);
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
      <div className="itinerary-btns">
        <div className="editbtn">
          <EditButton itineraryData={props}/>
        </div>
        <div className="delbtn">
          <DeleteItinerary itineraryData={props}/>
        </div>
      </div>
    </div>
  );
};

export default UserItinerary;