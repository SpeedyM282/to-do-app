import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { getMe, postLogout } from '../../api';
import { pagesHeadings, buttonsTexts, adminPageLinks, adminPageText } from '../../data';
import { updateRoleAction } from '../../store/reducers/userReducer';
import Button from '../../components/Button';
import TodoList from '../../components/TodoList';
import UsersList from '../../components/UsersList';
import './style.scss';

const Admin = () => {
  const dispatch = useDispatch();

  const [showTodos, setShowTodos] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const todosListLinkStyle = {
    fontWeight: showTodos ? 'bold' : 'normal'
  };

  const usersListLinkStyle = {
    fontWeight: showUsers ? 'bold' : 'normal'
  };

  useEffect(() => {
    getMe()
      .then(res => {
        if (res.data.role === 'admin') {
          dispatch(updateRoleAction(res.data.role));
        } else {
          toast.error("You are not logged in as Admin!");
          setTimeout(() => { window.location.href = '/to-do-app/' }, 1000);
        }
      })
      .catch(() => {
        toast.error("You are not logged in!");
        setTimeout(() => { window.location.href = '/to-do-app/' }, 1000);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const listToggle = JSON.parse(localStorage.getItem('listsToggle'));

    if (window.location.pathname === '/to-do-app/admin/todos-list') {
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

    window.location.href = '/to-do-app/admin/todos-list';
  }

  const showUsersList = () => {
    localStorage.setItem('listsToggle', JSON.stringify({ showTodos, showUsers }));

    window.location.href = '/to-do-app/admin/users-list';
  }

  const logout = () => {
    setIsDisabled(true);

    postLogout()
      .then(() => {
        setIsDisabled(false);
        window.location.href = '/to-do-app/';
      })
      .catch(() => {
        setIsDisabled(false);
        toast.error("Something went wrong\n Refresh the page or try later.");
      });
  }

  return (
    <div className='admin__block' >

      <Toaster position="top-left" />

      <nav className='admin__navbar' >
        <h1 className='admin__navbar-heading' >{pagesHeadings.ADMIN_PAGE}</h1>

        <div className='admin__navbar-links__block' >
          <button
            onClick={showTodoList}
            style={todosListLinkStyle}
            className='admin__navbar-link'
          >
            {adminPageLinks.TODOS_LIST}
          </button>

          <button
            onClick={showUsersList}
            style={usersListLinkStyle}
            className='admin__navbar-link'
          >
            {adminPageLinks.USERS_LIST}
          </button>
        </div>

        <div className='admin__navbar-buttons__block' >
          <Button onClick={logout} disabled={isDisabled} >
            {buttonsTexts.LOGOUT}
          </Button>
        </div>
      </nav>

      <main className='admin__main' >
        {
          !(showTodos || showUsers) &&
          <div className='admin__main-text__block' >
            <h3>{adminPageText.HEADING}</h3>
            <p>{adminPageText.DESCRIPTION}</p>
          </div>
        }

        {showTodos && <TodoList />}

        {showUsers && <UsersList />}
      </main>
    </div>
  );
}

export default Admin;