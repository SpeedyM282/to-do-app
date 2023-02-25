import React, { useEffect, useState } from 'react';
import { usersGET } from '../../api/UserAPI';
import User from '../User';
import './style.scss';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersGET()
      .then(res => setUsers(res.data.map((e, i) => <User key={i} login={e.login} role={e.role} name={e.name} />)))
      .catch(error => alert('Something Bad Happened:\n' + error));
  }, []);

  return (
    <div className='userslist__block' >
      <div className='userlist__headings--block'>
        <p className='userlist__headings' >Login:</p>
        <p className='userlist__headings' >Role:</p>
        <p className='userlist__headings' >Name:</p>
      </div>
      <div className='userslist' >
        {users}
      </div>
    </div>
  );
}

export default UsersList;