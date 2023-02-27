import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginPOST, logoutPOST, meGET } from '../../api';
import { UPDATE_ROLE } from '../../redux/actionTypes';
import Button from '../../components/Button';
import TodoList from '../../components/TodoList';
import UsersList from '../../components/UsersList';
import { LinkIcon } from '../../Icons';
import './style.scss';

function Admin() {
  const dispatch = useDispatch();
  const [showTodos, setShowTodos] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const todoStyle = {
    fontWeight: showTodos ? 'bold' : 'normal'
  };

  const userStyle = {
    fontWeight: showUsers ? 'bold' : 'normal'
  };

  useEffect(() => {
    meGET()
      .then(res => {
        dispatch({ type: UPDATE_ROLE, payload: res.data.role });
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

  function navigateToUserPage() {
    loginPOST('User', 'user123')
      .then(() => window.location.href = '/to-do-app/user')
      .catch(err => alert('Something went wrong:\n' + err));
  }

  function showTodoList() {
    localStorage.setItem('listsToggle', JSON.stringify({ showTodos, showUsers }));

    window.location.href = '/to-do-app/admin/todo-list';
  }

  function showUsersList() {
    localStorage.setItem('listsToggle', JSON.stringify({ showTodos, showUsers }));

    window.location.href = '/to-do-app/admin/users-list';
  }

  function logout() {
    logoutPOST()
      .then(() => {
        window.location.href = '/to-do-app/';
      })
      .catch(err => alert('Something went wrong:\n' + err));
  }

  return (
    <div className='admin__block' >

      <nav className='admin__navbar' >
        <h1 className='admin__navbar--heading' >ADMIN PAGE</h1>

        <div className='admin__navbar--links__block' >
          <button
            className='admin__navbar--link icon'
            onClick={navigateToUserPage}
          >
            User <LinkIcon />
          </button>

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
          <Button txt='Logout' onClick={logout} />
        </div>
      </nav>

      <main className='admin__main' >
        {showTodos && <TodoList />}

        {showUsers && <UsersList />}
      </main>

    </div>
  );
}

export default Admin;