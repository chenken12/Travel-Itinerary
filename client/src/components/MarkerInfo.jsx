import React from 'react';

const MarkerInfo = (props) => {
  const { name, index } = props;
  return (
    <div>
      <h4>{ name }</h4>
      { index }
    </div>
  );
};

export default MarkerInfo;