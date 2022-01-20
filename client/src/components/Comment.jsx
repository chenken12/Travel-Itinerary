import React from 'react';
import "../styles/comment.css"

const Comments = (props) => {
    const { text, time, name } = props;
    return (
      <div className='text-box'> 
        <h2>{name}</h2>
        <p>{text}</p>
        <a>{time}</a>
      </div>
    );
  };

  export default Comments;