import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { getMe, postLogout } from '../../api';
import { loaderStyle } from '../../utils';
import { pagesHeadings, buttonsTexts, adminPageLinks } from '../../data';
import Button from '../../components/Button';
import TodoList from '../../components/TodoList';
import UsersList from '../../components/UsersList';
import './style.scss';
import Loader from '../../components/Loader';

const Admin = () => {
  const role = useSelector(state => state.userReducer.role);

  const [showTodos, setShowTodos] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [loaderDisplay, setLoaderDisplay] = useState('none');

  const todoStyle = {
    fontWeight: showTodos ? 'bold' : 'normal'
  };

  const userStyle = {
    fontWeight: showUsers ? 'bold' : 'normal'
  };

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

  const showTodoList = () => {
    localStorage.setItem('listsToggle', JSON.stringify({ showTodos, showUsers }));

    window.location.href = '/to-do-app/admin/todo-list';
  }

  const showUsersList = () => {
    localStorage.setItem('listsToggle', JSON.stringify({ showTodos, showUsers }));

    window.location.href = '/to-do-app/admin/users-list';
  }

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
    <div style={loaderDisplay === 'flex' ? loaderStyle() : {}} className='admin__block' >
      {loaderDisplay === 'none' ? <>
        <nav className='admin__navbar' >
          <h1 className='admin__navbar--heading' >{pagesHeadings.ADMIN_PAGE}</h1>

          <div className='admin__navbar--links__block' >
            <button
              style={todoStyle}
              className='admin__navbar--link'
              onClick={showTodoList}
            >
              {adminPageLinks.TODOS_LIST}
            </button>

            <button
              style={userStyle}
              className='admin__navbar--link'
              onClick={showUsersList}
            >
              {adminPageLinks.USERS_LIST}
            </button>
          </div>

          <div className='admin__navbar--buttons__block' >
            <Button onClick={logout} >
              {buttonsTexts.LOGOUT}
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