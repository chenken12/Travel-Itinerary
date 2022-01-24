import UserDestinations from "./UserDestinations";
import { useEffect, useState } from "react";
import axios from "axios";
export default function UserItineraryData() {
  const [itineraryArr, setItineraryArr] = useState([]);
  useEffect(() => {
    console.log("useeffect");
    axios.get(`http://localhost:8080/api/travels`)
      .then(res => {
        console.log(res);
        console.log("res itinerary Arr: ", res.data.filter(itinerary => itinerary.users_id == 1));
        setItineraryArr(res.data.filter(itinerary => itinerary.users_id == 1));
      })
  }, [])
  console.log("Itinerary arr: ", itineraryArr);
  return (
    // <h1>Hello World!</h1>
    <UserDestinations travelIt = {itineraryArr}/>
  );
};