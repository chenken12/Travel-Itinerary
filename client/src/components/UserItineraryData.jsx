import UserDestinations from "./UserDestinations";
import { useEffect, useState } from "react";
import {useCookies} from "react-cookie";
import axios from "axios";
export default function UserItineraryData() {
  const [itineraryArr, setItineraryArr] = useState([]);
  const [cookies] = useCookies();
  useEffect(() => {
    console.log("useeffect");
    axios.get(`/api/travels`)
      .then(res => {
        // console.log("cookie: ", cookies.user.id);
        // console.log(res);
        // console.log("res itinerary Arr: ", res.data.filter(itinerary => itinerary.users_id === cookies.user.id));
        setItineraryArr(res.data.filter(itinerary => itinerary.users_id === cookies.user.id));
      })
  }, [cookies.user])
  // console.log("Itinerary arr: ", itineraryArr);
  return (
    // <h1>Hello World!</h1>
    <UserDestinations travelIt = {itineraryArr}/>
  );
};