import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutPOST, meGET } from '../../api';
import { UPDATE_ROLE } from '../../redux/actionTypes';
import { loaderStyle } from '../../utils';
import TodoList from '../../components/TodoList';
import Button from '../../components/Button';
import './style.scss';
import Loader from '../../components/Loader';

function UserPage() {
  const dispatch = useDispatch();
  const [loaderDisplay, setLoaderDisplay] = useState('none');

  useEffect(() => {
    meGET()
      .then(res => {
        dispatch({ type: UPDATE_ROLE, payload: res.data.role });
      })
      .catch(() => window.location.href = '/to-do-app/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logout() {
    setLoaderDisplay('flex');

    logoutPOST()
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
            <h1 className='user__page__heading' >USER PAGE</h1>
            <Button onClick={logout} >
              Logout
            </Button>
          </div>

          <TodoList />
        </> : <Loader />
      }
    </div>
  );
}

export default UserPage;