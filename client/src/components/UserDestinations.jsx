import UserItinerary from '../components/UserItinerary'

const UserDestinations = (props) => {
  const {travelIt} = props;
  const userTravelItineraries = 
    travelIt.map(el => {
      return (
        <UserItinerary key={el.id} {...el}/>
      );
    })
  return (
    userTravelItineraries
  );
};

export default UserDestinations;