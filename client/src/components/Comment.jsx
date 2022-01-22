import React from 'react';

const Comments = (props) => {
    const { text, time, name } = props;
    return (
      <div className='text-box'> 
        <div className='comment-header'>
          <strong>{name}</strong>
          <p className='comment-time'>{time}</p>
        </div>

        <p> {text}</p>
       
      </div>
    );
  };

  export default Comments;