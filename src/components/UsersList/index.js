import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getUsers } from '../../api';
import { usersListHeadings } from '../../data';
import Loader from '../Loader';
import User from '../User';
import './style.scss';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loaderDisplay, setLoaderDisplay] = useState(true);

  useEffect(() => {
    getUsers()
      .then(res => {
        setLoaderDisplay(false);
        setUsers(res.data.map((e, i) => {
          return <User key={i} login={e.login} role={e.role} name={e.name} />
        }));
      })
      .catch(() => {
        setLoaderDisplay(false);
        toast.error("Something went wrong\n Refresh the page or try later.");
      });
  }, []);

  return (
    <div className='userslist__block' >

      <Toaster position="top-left" />

      <div className='userlist__headings--block' >
        <p className='userlist__headings' >
          {usersListHeadings.LOGIN_USERNAME}:
        </p>

        <p className='userlist__headings' >
          {usersListHeadings.ROLE}:
        </p>

        <p className='userlist__headings' >
          {usersListHeadings.NAME}:
        </p>
      </div>

      <div className='userslist' >
        {loaderDisplay && <Loader />}
        {users}
      </div>
    </div>
  );
}

export default UsersList;