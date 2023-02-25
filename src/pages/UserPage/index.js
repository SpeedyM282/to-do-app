import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutPOST, meGET } from '../../api';
import { UPDATE_ROLE } from '../../redux/actionTypes';
import TodoList from '../../components/TodoList';
import Button from '../../components/Button';
import './style.scss';

function UserPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    meGET()
      .then(res => dispatch({ type: UPDATE_ROLE, payload: res.data.role }))
      .catch(() => window.location.href = '/to-do-app/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logout() {
    logoutPOST()
      .then(res => {
        console.log(res);
        window.location.href = '/to-do-app/';
      })
      .catch(err => alert('Something went wrong:\n' + err));
  }

  return (
    <div className='user__page__block' >
      <div className='user__page__header' >
        <h1 className='user__page__heading' >USER PAGE</h1>
        <Button txt='Logout' onClick={logout} />
      </div>
      <TodoList />
    </div>
  );
}

export default UserPage;