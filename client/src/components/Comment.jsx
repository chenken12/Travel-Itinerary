import React from 'react';

const Comments = (props) => {
    const { text, time, name } = props;
    return (
      <div className='comment-box'> 
        <h2>{name}</h2>
        <p>{text}</p>
        <a>{time}</a>
      </div>
    );
  };

  export default Comments;