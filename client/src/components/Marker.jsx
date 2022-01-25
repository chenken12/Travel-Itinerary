import React from 'react';
import '../styles/Marker.css';

const Marker = (props) => {
  const { color, name, index } = props;
  return (
    <div>
      <div
        className="pin bounce"
        style={{ backgroundColor: color, cursor: 'pointer' }}
        title={name}
        onClick={() => console.log("test" + name)}
      >
        <p>{ index }</p>
      </div>
      <div className="pulse" />
    </div>
  );
};
export default Marker;
