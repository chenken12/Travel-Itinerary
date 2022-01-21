const MarkerInfo = (props) => {
  const { name, index } = props;
  return (
    <div className='text-box'>
      { index }: 
      <strong>{ name }</strong>
     
    </div>
  );
};

export default MarkerInfo;
