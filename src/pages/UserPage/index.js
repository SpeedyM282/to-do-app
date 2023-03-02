import React, { useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { getMe, postLogout } from '../../api';
import { loaderStyle } from '../../utils';
import { pagesHeadings, buttonsTexts } from '../../data';
import TodoList from '../../components/TodoList';
import Button from '../../components/Button';
import './style.scss';
import Loader from '../../components/Loader';

const UserPage = () => {
  const role = useSelector(state => state.userReducer.role);

  const [loaderDisplay, setLoaderDisplay] = useState('none');

  useLayoutEffect(() => {
    setLoaderDisplay('flex');

    getMe()
      .then(() => {
        if (role !== 'admin') {
          setLoaderDisplay('none');
          window.location.href = '/to-do-app/';
        } else {
          setLoaderDisplay('none');
        }
      })
      .catch(() => window.location.href = '/to-do-app/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    setLoaderDisplay('flex');

    postLogout()
      .then(() => {
        setLoaderDisplay('none');
        window.location.href = '/to-do-app/';
      })
      .catch(err => alert('Something went wrong:\n' + err));
  }

  return (
    <div style={loaderDisplay === 'flex' ? loaderStyle() : {}} className='user__page__block' >
      {loaderDisplay === 'none' ?
        <>
          <div className='user__page__header' >
            <h1 className='user__page__heading' >{pagesHeadings.USER_PAGE}</h1>
            <Button onClick={logout} >
              {buttonsTexts.LOGOUT}
            </Button>
          </div>

          <TodoList />
        </> : <Loader />
      }
    </div>
  );
}

export default UserPage;