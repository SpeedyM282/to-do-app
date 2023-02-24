import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoDELETE } from '../../api/UserAPI';
import { DELETE_TODO } from '../../redux/actionTypes';
import Button from '../Button';
import './style.scss';

function Todo({ id, title, description }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  function handleClick() {
    setShow(false);
    dispatch({ type: DELETE_TODO, payload: id });
    todoDELETE(id);
  }

  return show ? (
    <div className='todo__block' >
      <div className='todo__text__block' >
        <h2 className='todo__text--title' >{title}</h2>
        <p className='todo__text--description' >{description}</p>
      </div>

      <div className='todo__buttons__block' >
        <Button txt='Delete' onClick={handleClick} />
      </div>
    </div>
  ) : <></>;
}

export default Todo;