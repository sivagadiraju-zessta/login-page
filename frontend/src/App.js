import React, { useState } from 'react';
import Welcome from './components/Welcome';
import './App.css';

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch('http://localhost:3005/', {
      method: 'POST',
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => localStorage.setItem('token', json.token));

    verification();
  };

  const verification = async () => {
    const token = localStorage.getItem('token');
    console.log('token in app.js', token);

    const response = await fetch('http://localhost:3005/', {
      method: 'GET',
      headers: {
        token: token,
      },
    });
    response.text().then(function (text) {
      console.log(text);
      setUser(true);
      setIsSubmitted(true);
    });
  };

  const renderForm = (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <label>Username </label>
          <input
            type='text'
            name='uname'
            required
            onChange={(ev) => setUserName(ev.target.value)}
          />
        </div>
        <div className='input-container'>
          <label>Password </label>
          <input
            type='password'
            name='pass'
            required
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        <div className='button-container'>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className='app'>
      <div className='login-form'>
        {!isSubmitted && <div className='title'>Sign In</div>}
        {isSubmitted && userName !== '' ? (
          <div>{userName} is successfully logged in</div>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}

export default App;
