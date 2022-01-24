const UserItinerary = (props) => {
  console.log('props itinerary: ', props);
  const {name, description, city_name, country_name, travel_start_date, travel_end_date} = props;
  return (
    <div style={{backgroundColor: "white", color: "black"}}> 
      <h1>{name}</h1>
      <p>{description}</p>
      <h1>{city_name}</h1>
      <h1>{country_name}</h1>
      <h1>{travel_start_date}</h1>
      <h1>{travel_end_date}</h1>
    </div>
  );
};

export default UserItinerary;