import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './style.scss';

function Step1() {
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
      <div className='block__inputs' >
        <h1>Login Page</h1>
        <Input
          label='Username'
          type='text'
          value={username}
          onChange={updUsername}
          field='username'
        />
        <Input
          label='Password'
          type='password'
          value={password}
          onChange={updPassword}
          field='password'
        />
      </div>
      <div className='block__buttons' >
        <Button
          txt='Next'
        />
      </div>
      <p className='admin__login' >Login as <a href='#'>admin</a></p>
    </div>
  );
}

export default Step1;