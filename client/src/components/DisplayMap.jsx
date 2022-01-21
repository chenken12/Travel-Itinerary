import React from 'react';
import Marker from './Marker';
import MarkerInfo from './MarkerInfo';
import Comment from './Comment';

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

const displayComments = function(comments) {
  return comments.map((comment) => {
    const dateParts = comment.created_at.split("-");
    const jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return(
      <Comment 
        key={"comment"+comment.id} 
        text={comment.comment} 
        time={jsDate.toLocaleDateString("en-US", options)} 
        name={`${comment.first_name} ${comment.last_name}`} 
      />
    )
  });
};

export {displayMarker, displayMarkerInfo, displayComments};
