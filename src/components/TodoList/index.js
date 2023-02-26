import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todosGET } from '../../api/todosAPI';
import { ASSIGN_TODOS } from '../../redux/actionTypes';
import Form from '../Form';
import './style.scss';

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todosReducer);

  useEffect(() => {
    todosGET()
      .then(res => {
        dispatch({ type: ASSIGN_TODOS, payload: res.data });
      })
      .catch(err => alert('Something went wrong:\n' + err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='todolist__block' >
      <Form btnTxt='Add' />
      <div className='todolist__list__block' >
        {todos}
      </div>
    </div>
  );
}

export default TodoList;