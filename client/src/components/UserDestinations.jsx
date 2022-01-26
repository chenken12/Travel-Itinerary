import UserItinerary from '../components/UserItinerary'
import "../styles/userDestination.css";
const UserDestinations = (props) => {
  const {travelIt} = props;
  const userTravelItineraries = 
    travelIt.map(el => {
      return (
        <div>
          <UserItinerary key={el.id} {...el}/>
        </div>
      );
    })
  return (
    <div className='grid'>
      {userTravelItineraries}
    </div>
  );
};

export default UserDestinations;