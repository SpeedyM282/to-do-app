import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateRoleAction } from '../../store/reducers/userReducer';
import { postLogin } from '../../api';
import { buttonsTexts, inputsLabels, pagesHeadings } from '../../data';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './style.scss';

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
        toast.error("That didn't work\n Please try again!");
      });
  }

  return (
    <form className='login'>

      <Toaster position="top-left" />

      {role && <Navigate to={`/to-do-app/${role}`} />}

      <div className='login__inputs__block' >
        <h1 className='login__heading' >{pagesHeadings.LOGIN_PAGE}</h1>

        <Input
          type='text'
          value={username}
          isError={isError}
          label={inputsLabels.USERNAME}
          onChange={(value) => setUsername(value)}
        />

        <Input
          type='password'
          value={password}
          isError={isError}
          label={inputsLabels.PASSWORD}
          onChange={(value) => setPassword(value)}
        />
      </div>

      <Button
        type='submit'
        onClick={handleClick}
        disabled={isDisabled}
        loaderDisplay={loaderDisplay}
      >
        {buttonsTexts.LOGIN}
      </Button>
    </form>
  );
}

export default Login;