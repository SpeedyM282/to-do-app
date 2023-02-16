import React from 'react';
import Button from '../Button';
import './style.scss';

function Todo({ heading, description }) {
  return (
    <div className='todo__block' >
      <div className='todo__text__block' >
        <h2 className='todo__text--heading' >{heading}</h2>
        <p className='todo__text--description' >{description}</p>
      </div>

      <div className='todo__buttons__block' >
        <Button txt='Delete' />
      </div>
    </div>
  );
}

export default Todo;