import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api';
import { usersListHeadings } from '../../data';
import Loader from '../Loader';
import User from '../User';
import './style.scss';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loaderDisplay, setLoaderDisplay] = useState('flex');

  useEffect(() => {
    getUsers()
      .then(res => {
        setLoaderDisplay('none');
        setUsers(res.data.map((e, i) => {
          return <User key={i} login={e.login} role={e.role} name={e.name} />
        }));
      })
      .catch(error => alert('Something Bad Happened:\n' + error));
  }, []);

  return (
    <div className='userslist__block' >
      <div className='userlist__headings--block'>
        <p className='userlist__headings' >{usersListHeadings.LOGIN_USERNAME}:</p>
        <p className='userlist__headings' >{usersListHeadings.ROLE}:</p>
        <p className='userlist__headings' >{usersListHeadings.NAME}:</p>
      </div>
      <div className='userslist' >
        <Loader display={loaderDisplay} />
        {users}
      </div>
    </div>
  );
}

export default UsersList;