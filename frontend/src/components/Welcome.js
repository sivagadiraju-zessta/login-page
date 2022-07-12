import React from 'react';
import '../App.css';
const Welcome = (props) => {
  const user = props.data;
  console.log('user', user);
  return (
    <div className='login-form'>
      <div>Welcome, {user}</div>
      <button onClick={props.onClose}>Logout</button>
    </div>
  );
};

export default Welcome;
