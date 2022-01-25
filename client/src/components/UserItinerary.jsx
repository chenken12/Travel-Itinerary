import { dateformat } from "../helpers/dateformat";
const UserItinerary = (props) => {
  console.log('props itinerary: ', props);
  const {name, description, location, travel_start_date, travel_end_date} = props;
  return (
    <div className="user-travels-page" style={{backgroundColor: "white", color: "black"}}> 
      <h1>{name}</h1>
      <p>{description}</p>
      <h1>{location}</h1>
      <h1>{dateformat(travel_start_date)}</h1>
      <h1>{dateformat(travel_end_date)}</h1>
    </div>
  );
};

export default UserItinerary;