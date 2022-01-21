import MarkerInfo from "./MarkerInfo";
import { getDate } from "../helpers/dateformat";

const MarkerInfoList = (props) => {
  const { day, markerList } = props;

  const parsedInfo = markerList.map((marker, index) => {
    return <MarkerInfo key={`markerinfo${marker.id}`} name={marker.pinned_name} index={ index + 1 }/>;
  });

  return (
    <div className='text-box'>
      { day }
      { parsedInfo }
    </div>
  );
};

export default MarkerInfoList;