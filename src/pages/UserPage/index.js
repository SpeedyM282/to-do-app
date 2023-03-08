import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
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
          toast.error("You are not logged in as User!");
          setTimeout(() => { window.location.href = '/to-do-app/' }, 3000);
        }
      })
      .catch(() => {
        toast.error("You are not logged in!");
        setTimeout(() => { window.location.href = '/to-do-app/' }, 3000);
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
      .catch(() => {
        setIsDisabled(false);
        setLoaderDisplay('none');
        toast.error("That didn't work\n Please try again!");
      });
  }

  return (
    <div className='user__page__block' >

      <Toaster position="top-left" />

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