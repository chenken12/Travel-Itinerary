import UserItinerary from '../components/UserItinerary'

const UserDestinations = (props) => {
  const {travelIt} = props;
  console.log('props: ', props);
  const userTravelItineraries = 
    travelIt.map(el => {
      return (
        <UserItinerary key={el.id} {...el}/>
      );
    })
    console.log("travelItineraries", userTravelItineraries);
  return (
    userTravelItineraries
  );
};

export default UserDestinations;