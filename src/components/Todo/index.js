import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todoDELETE } from '../../api/todosAPI';
import { DELETE_TODO } from '../../redux/actionTypes';
import { DeleteIcon, EditIcon } from '../../Icons';
// import Form from '../Form';
import './style.scss';

function Todo({ id, title, description, createdBy }) {
  const dispatch = useDispatch();
  const role = useSelector(state => state.userReducer.role);
  const [show, setShow] = useState(true);

  function updateTodo() {
    // return (
    //   <Form btnTxt='Save' />
    // )
  }

  function deleteTodo() {
    setShow(false);
    todoDELETE(id)
      .then(() => {
        dispatch({ type: DELETE_TODO, payload: id });
      })
      .catch(err => alert('Something went wrong:\n' + err));
  }

  function buttons() {
    if (role === 'user' && createdBy !== 'user') {
      return <h5>Created By Admin</h5>;
    } else {
      return (
        <div className='todo__buttons__block' >
          <EditIcon onClick={updateTodo} />
          <DeleteIcon onClick={deleteTodo} />
        </div>
      );
    }
  }

  return show ? (
    <div className='todo__block' >
      <div className='todo__text__block' >
        <h2 className='todo__text--title' >{title}</h2>
        <p className='todo__text--description' >{description}</p>
      </div>
      {buttons()}
    </div>
  ) : <></>;
}

export default Todo;