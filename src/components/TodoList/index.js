import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buttonsTexts } from '../../data';
import { getTodos } from '../../api/todosAPI';
import { assignTodosAction } from '../../store/reducers/todosReducer';
import Form from '../Form';
import Loader from '../Loader';
import './style.scss';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todosReducer);

  const [loaderDisplay, setLoaderDisplay] = useState('flex');

  useEffect(() => {
    getTodos()
      .then(res => {
        setLoaderDisplay('none')
        dispatch(assignTodosAction(res.data));
      })
      .catch(err => alert('Something went wrong:\n' + err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='todolist__block' >
      <Form btnTxt={buttonsTexts.ADD} />

      <div className='todolist__list__block' >
        <Loader display={loaderDisplay} />
        {todos}
      </div>
    </div>
  );
}

export default TodoList;