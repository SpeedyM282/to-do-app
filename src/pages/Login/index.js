import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_ROLE } from '../../redux/actionTypes';
import { loginPOST } from '../../api';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './style.scss';

function Login() {
  const dispatch = useDispatch();
  const role = useSelector(state => state.userReducer.role);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleClick() {
    loginPOST(username, password)
      .then(res => {
        dispatch({ type: UPDATE_ROLE, payload: res.data.role });
      })
      .catch((err) => alert('Something went wrong:\n' + err));
  }

  return (
    <div className='login'>
      {role && <Navigate to={`/to-do-app/${role}`} />}

      <div className='login__inputs__block' >
        <h1 className='login__heading' >Login Page</h1>

        <Input
          label='Username'
          type='text'
          value={username}
          onChange={(value) => setUsername(value)}
        />

        <Input
          label='Password'
          type='password'
          value={password}
          onChange={(value) => setPassword(value)}
        />
      </div>

      <div className='block__buttons' >
        <Button
          txt='Login'
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Login;