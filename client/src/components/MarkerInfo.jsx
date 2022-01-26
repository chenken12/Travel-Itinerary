const MarkerInfo = (props) => {
  const { name, index, color } = props;
  return (
    <div>
      <span className="dot" style={{border: `2px solid ${color}`}}>{ index }</span>
      : 
      <strong>{ name }</strong>
     
    </div>
  );
};

export default MarkerInfo;
