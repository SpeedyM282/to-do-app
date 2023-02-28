import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutPOST, meGET } from '../../api';
import { UPDATE_ROLE } from '../../redux/actionTypes';
import { loaderStyle } from '../../utils';
import Button from '../../components/Button';
import TodoList from '../../components/TodoList';
import UsersList from '../../components/UsersList';
import './style.scss';
import Loader from '../../components/Loader';

function Admin() {
  const dispatch = useDispatch();

  const [showTodos, setShowTodos] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [loaderDisplay, setLoaderDisplay] = useState('none');

  const todoStyle = {
    fontWeight: showTodos ? 'bold' : 'normal'
  };

  const userStyle = {
    fontWeight: showUsers ? 'bold' : 'normal'
  };

  useEffect(() => {
    meGET()
      .then(res => {
        if (res.data.role === 'admin') {
          dispatch({ type: UPDATE_ROLE, payload: res.data.role });
        } else {
          window.location.href = '/to-do-app/'
        }
      })
      .catch(() => window.location.href = '/to-do-app/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const listToggle = JSON.parse(localStorage.getItem('listsToggle'));

    if (window.location.pathname === '/to-do-app/admin/todo-list') {
      setShowUsers(false);
      setShowTodos(true);
    } else if (window.location.pathname === '/to-do-app/admin/users-list') {
      setShowTodos(false);
      setShowUsers(true);
    } else {
      setShowTodos(listToggle.showTodos);
      setShowUsers(listToggle.showUsers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  function showTodoList() {
    localStorage.setItem('listsToggle', JSON.stringify({ showTodos, showUsers }));

    window.location.href = '/to-do-app/admin/todo-list';
  }

  function showUsersList() {
    localStorage.setItem('listsToggle', JSON.stringify({ showTodos, showUsers }));

    window.location.href = '/to-do-app/admin/users-list';
  }

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
    <div style={loaderDisplay === 'flex' ? loaderStyle() : {}} className='admin__block' >
      {loaderDisplay === 'none' ? <>
        <nav className='admin__navbar' >
          <h1 className='admin__navbar--heading' >ADMIN PAGE</h1>

          <div className='admin__navbar--links__block' >
            <button
              style={todoStyle}
              className='admin__navbar--link'
              onClick={showTodoList}
            >
              Todos List
            </button>

            <button
              style={userStyle}
              className='admin__navbar--link'
              onClick={showUsersList}
            >
              Users List
            </button>
          </div>

          <div className='admin__navbar--buttons__block' >
            <Button onClick={logout} >
              Logout
            </Button>
          </div>
        </nav>

        <main className='admin__main' >
          {showTodos && <TodoList />}

          {showUsers && <UsersList />}
        </main>
      </> : <Loader />
      }

    </div>
  );
}

export default Admin;