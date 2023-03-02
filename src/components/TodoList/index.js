import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../api/todosAPI';
import { assignTodos } from '../../store/todosReducer';
import Form from '../Form';
import Loader from '../Loader';
import './style.scss';

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todosReducer);

  const [loaderDisplay, setLoaderDisplay] = useState('flex');

  useEffect(() => {
    getTodos()
      .then(res => {
        setLoaderDisplay('none')
        dispatch(assignTodos(res.data));
      })
      .catch(err => alert('Something went wrong:\n' + err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='todolist__block' >
      <Form btnTxt='Add' />
      <div className='todolist__list__block' >
        <Loader display={loaderDisplay} />
        {todos}
      </div>
    </div>
  );
}

export default TodoList;