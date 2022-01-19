const MarkerInfo = (props) => {
  const { name, index } = props;
  return (
    <div className='text-box'>
      <h4>{ name }</h4>
      { index }
    </div>
  );
};

export default MarkerInfo;
