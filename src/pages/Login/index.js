import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateRole } from '../../store/userReducer';
import { postLogin } from '../../api';
import { loaderStyle } from '../../utils';
import { buttonsTexts, inputsLabels, pagesHeadings } from '../../data';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './style.scss';
import Loader from '../../components/Loader';

const Login = () => {
  const dispatch = useDispatch();
  const role = useSelector(state => state.userReducer.role);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loaderDisplay, setLoaderDisplay] = useState('none');

  const handleClick = () => {
    setLoaderDisplay('flex');

    postLogin(username, password)
      .then(res => {
        setLoaderDisplay('none');
        dispatch(updateRole(res.data.role));
      })
      .catch((err) => alert('Something went wrong:\n' + err));
  }

  return (
    <div style={loaderDisplay === 'flex' ? loaderStyle() : {}} className='login'>
      {loaderDisplay === 'none' ?
        <>
          {role && <Navigate to={`/to-do-app/${role}`} />}

          <div className='login__inputs__block' >
            <h1 className='login__heading' >{pagesHeadings.LOGIN_PAGE}</h1>

            <Input
              label={inputsLabels.USERNAME}
              type='text'
              value={username}
              onChange={(value) => setUsername(value)}
            />

            <Input
              label={inputsLabels.PASSWORD}
              type='password'
              value={password}
              onChange={(value) => setPassword(value)}
            />
          </div>

          <div className='block__buttons' >
            <Button
              onClick={handleClick}
            >
              {buttonsTexts.LOGIN}
            </Button>
          </div>
        </> : <Loader />
      }
    </div>
  );
}

export default Login;