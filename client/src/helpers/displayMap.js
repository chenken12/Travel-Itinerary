import React from 'react';
import Marker from '../components/Marker';
import MarkerInfo from '../components/MarkerInfo';

const displayMarker = function(markers) {
  return markers.map((marker) => {
    return(
      <Marker 
        key={"marker"+marker.id} 
        lat={marker.lat} 
        lng={marker.long} 
        name={marker.pinned_name} 
        color="blue" 
      />
    )
  });
};

const displayMarkerInfo = function(markers) {
  return markers.map((marker, index) => {
    return(
      <MarkerInfo 
        key={ "markerinfo"+marker.id } 
        name={ marker.pinned_name } 
        index={ index + 1 }
      />
    )
  });
};

export {displayMarker, displayMarkerInfo};