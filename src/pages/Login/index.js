import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateRoleAction } from '../../store/reducers/userReducer';
import { postLogin } from '../../api';
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
  const [isError, setIsError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loaderDisplay, setLoaderDisplay] = useState('none');

  const handleClick = () => {
    if (username.length === 0 || password.length === 0) {
      setIsError(true);
      return;
    }
    setLoaderDisplay('flex');
    setIsDisabled(true);

    postLogin(username, password)
      .then(res => {
        setIsDisabled(false);
        setLoaderDisplay('none');
        dispatch(updateRoleAction(res.data.role));
      })
      .catch(() => {
        setIsDisabled(false);
        setIsError(true);
        setLoaderDisplay('none');
      });
  }

  return (
    <form className='login'>
      {role && <Navigate to={`/to-do-app/${role}`} />}

      <div className='login__inputs__block' >
        <h1 className='login__heading' >{pagesHeadings.LOGIN_PAGE}</h1>

        <Input
          label={inputsLabels.USERNAME}
          type='text'
          value={username}
          onChange={(value) => setUsername(value)}
          isError={isError}
        />

        <Input
          label={inputsLabels.PASSWORD}
          type='password'
          value={password}
          onChange={(value) => setPassword(value)}
          isError={isError}
        />
      </div>

      <Button
        onClick={handleClick}
        type='submit'
        disabled={isDisabled}
      >
        {
          loaderDisplay === 'none' ?
            buttonsTexts.LOGIN :
            <Loader display={loaderDisplay} isSpinner={true} />
        }
      </Button>
    </form>
  );
}

export default Login;