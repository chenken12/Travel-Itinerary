const MarkerInfo = (props) => {
  const { name, index } = props;
  return (
    <div>
      { index }: 
      <strong>{ name }</strong>
     
    </div>
  );
};

export default MarkerInfo;
