const MarkerInfo = (props) => {
  const { name, index, color, removeMarker } = props;
  return (
    <div className="marker_delete">
      <div>
        <span className="dot" style={{border: `2px solid ${color}`}}>{ index }</span>
        : 
        <strong>{ name }</strong>
      </div>
      <div>
        
        <i className="far fa-times-circle" style={{padding: "5px", cursor: 'pointer'}} onClick={removeMarker}></i>
      </div>
    </div>
  );
};

export default MarkerInfo;
