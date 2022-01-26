import React from "react";
import MarkerInfo from "./MarkerInfo";
import { dateformat } from "../helpers/dateformat";

const MarkerInfoList = (props) => {
  const { day, markerList, color, removeMarker, mode } = props;

  const parsedInfo = markerList.map((marker, index) => {
    if (day === dateformat(marker.date)) {
      return <MarkerInfo key={`markerinfo${marker.id}`} name={marker.pinned_name} color={ color } mode={mode} removeMarker={() => removeMarker(marker.id)} index={ index + 1 }/>;
    }
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