import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './style.scss';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function updUsername(value) {
    setUsername(value);
  }

  function updPassword(value) {
    setPassword(value);
  }

  return (
    <div className='login'>
      <div className='login__inputs__block' >
        <h1 className='login__heading' >Login Page</h1>
        <Input
          label='Username'
          type='text'
          value={username}
          onChange={updUsername}
        />
        <Input
          label='Password'
          type='password'
          value={password}
          onChange={updPassword}
        />
      </div>
      <div className='block__buttons' >
        <Button
          txt='Login'
        />
      </div>
    </div>
  );
}

export default Login;