import React from "react";
import MarkerInfo from "./MarkerInfo";
import { dateformat } from "../helpers/dateformat";

const MarkerInfoList = (props) => {
  const { day, markerList } = props;

  const markerfilter = markerList.filter((marker) =>{ 
    return day === dateformat(marker.date);
  }); 

  const parsedInfo = markerfilter.map((marker, index) => {
    // if (day === dateformat(marker.date)) {
      return <MarkerInfo key={`markerinfo${marker.id}`} name={marker.pinned_name} index={ index + 1 }/>;
    // }
  });
  

  return (
    <div className='text-box'>
      { day }
      {parsedInfo.length > 0 && parsedInfo }
      {/* {markerfilter.length > 0 && <a>test</a> } */}
    </div>
  );
};

export default MarkerInfoList;