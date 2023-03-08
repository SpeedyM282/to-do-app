import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { buttonsTexts } from '../../data';
import { getTodos } from '../../api/todosAPI';
import { assignTodosAction } from '../../store/reducers/todosReducer';
import Form from '../Form';
import Loader from '../Loader';
import './style.scss';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todosReducer); // store only data that should be used

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(res => {
        setIsLoading(false);
        dispatch(assignTodosAction(res.data));
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Something went wrong\n Refresh the page or try later.");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='todolist__block' >

      <Toaster position="top-left" />

      <Form btnTxt={buttonsTexts.ADD} />

      <div className='todolist-list__block' >
        {
          isLoading ?
            <Loader /> :
            todos
        }
      </div>
    </div>
  );
}

export default TodoList;