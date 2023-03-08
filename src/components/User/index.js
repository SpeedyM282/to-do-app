import React from 'react';
import './style.scss';

const User = ({ login, role, name }) => {
  return (
    <div className='user__block' >
      <p className='user__block-text' >
        {login}
      </p>

      <p className='user__block-text' >
        {role}
      </p>

      <p className='user__block-text' >
        {name}
      </p>
    </div>
  );
}

export default User;