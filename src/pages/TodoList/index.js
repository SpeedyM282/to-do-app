import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todosGET, todosPOST } from '../../api/UserAPI';
import * as actions from '../../redux/actionTypes';
import Input from '../../components/Input';
import Button from '../../components/Button';
import './style.scss';

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todosReducer);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const INPUT_MIN_LENGTH = 3;

  useEffect(() => {
    todosGET()
      .then(res => dispatch({ type: actions.ASSIGN_TODOS, payload: res.data }))
      .catch(error => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updTitle(value) {
    setTitle(value);
  }

  function updDescription(value) {
    setDescription(value);
  }

  function handleClick() {
    if (title.length < INPUT_MIN_LENGTH || description.length < INPUT_MIN_LENGTH) {
      alert('Title and Description lengths must be more than 3 characters!');
      return;
    }

    todosPOST(title, description)
      .then(res => dispatch({ type: actions.ADD_TODO, payload: res.data }))
      .catch(error => console.log('Error: ', error));

    setTitle('');
    setDescription('');
  }

  return (
    <div className='todolist__block' >
      <div className='todolist__header' >
        <h1 className='todolist__heading' >TODO LIST</h1>
        <Button txt='Logout' />
      </div>

      <div className='todolist__input--form' >
        <div className='todolist__inputs__block'>
          <Input
            label='Title'
            type='text'
            max='15'
            value={title}
            onChange={updTitle}
          />
          <Input
            label='Description'
            type='text'
            max='40'
            value={description}
            onChange={updDescription}
          />
        </div>
        <Button txt='Add' onClick={handleClick} />
      </div>

      <div className='todolist__list__block' >
        {todos}
      </div>
    </div>
  );
}

export default TodoList;