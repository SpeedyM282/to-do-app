import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMe, postLogout } from '../../api';
import { pagesHeadings, buttonsTexts, adminPageLinks } from '../../data';
import { updateRoleAction } from '../../store/reducers/userReducer';
import Button from '../../components/Button';
import TodoList from '../../components/TodoList';
import UsersList from '../../components/UsersList';
import './style.scss';
import Loader from '../../components/Loader';

const Admin = () => {
  const dispatch = useDispatch();

  const [showTodos, setShowTodos] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loaderDisplay, setLoaderDisplay] = useState('none');

  const todoStyle = {
    fontWeight: showTodos ? 'bold' : 'normal'
  };

  const userStyle = {
    fontWeight: showUsers ? 'bold' : 'normal'
  };

  useEffect(() => {
    getMe()
      .then(res => {
        if (res.data.role === 'admin') {
          dispatch(updateRoleAction(res.data.role));
        } else {
          alert('You are not logged in as Admin!');
          window.location.href = '/to-do-app/'
        }
      })
      .catch(() => {
        alert('You are not logged in!');
        window.location.href = '/to-do-app/';
      });
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
    <div className='admin__block' >
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
          <Button onClick={logout} disabled={isDisabled} >
            {
              loaderDisplay === 'none' ?
                buttonsTexts.LOGOUT :
                <Loader display={loaderDisplay} isSpinner={true} />
            }
          </Button>
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