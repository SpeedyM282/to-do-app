import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMe, postLogout } from '../../api';
import { pagesHeadings, buttonsTexts } from '../../data';
import { updateRoleAction } from '../../store/reducers/userReducer';
import Button from '../../components/Button';
import TodoList from '../../components/TodoList';
import './style.scss';

const UserPage = () => {
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(false);
  const [loaderDisplay, setLoaderDisplay] = useState('none');

  useEffect(() => {
    getMe()
      .then((res) => {
        if (res.data.role === 'user') {
          dispatch(updateRoleAction(res.data.role));
        } else {
          alert('You are not logged in as User!');
          window.location.href = '/to-do-app/';
        }
      })
      .catch(() => {
        alert('You are not logged in!'); // USE TOASTER
        window.location.href = '/to-do-app/';
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    setLoaderDisplay('flex');
    setIsDisabled(true);

    postLogout()
      .then(() => {
        setIsDisabled(false);
        setLoaderDisplay('none');
        window.location.href = '/to-do-app/';
      })
      .catch(err => alert('Something went wrong:\n' + err));
  }

  return (
    <div className='user__page__block' >
      <div className='user__page-header' >
        <h1 className='user__page-heading' >{pagesHeadings.USER_PAGE}</h1>

        <Button onClick={logout} disabled={isDisabled} loaderDisplay={loaderDisplay} >
          {buttonsTexts.LOGOUT}
        </Button>
      </div>

      <TodoList />
    </div>
  );
}

export default UserPage;