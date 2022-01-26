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
        setItineraryArr(res.data.filter(itinerary => itinerary.users_id === cookies.user.id));
      })
  }, [cookies.user])
  return (
    <UserDestinations travelIt = {itineraryArr}/>
  );
};