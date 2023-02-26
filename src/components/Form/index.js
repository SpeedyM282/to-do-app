import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todosPOST } from '../../api/todosAPI';
import { ADD_TODO } from '../../redux/actionTypes';
import Input from '../Input';
import Button from '../Button';
import './style.scss';

function Form({ btnTxt }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const INPUT_MIN_LENGTH = 3;

  function addTodo() {
    if (title.length < INPUT_MIN_LENGTH || description.length < INPUT_MIN_LENGTH) {
      alert('Title and Description lengths must be more than 3 characters!');
      return;
    }

    todosPOST(title, description)
      .then(res => {
        dispatch({ type: ADD_TODO, payload: res.data });
      })
      .catch(err => alert('Something went wrong:\n' + err));

    setTitle('');
    setDescription('');
  }

  return (
    <div className='form' >
      <div className='inputs__block'>
        <Input
          label='Title'
          type='text'
          max='15'
          value={title}
          onChange={(value) => setTitle(value)}
        />
        <Input
          label='Description'
          type='text'
          max='30'
          value={description}
          onChange={(value) => setDescription(value)}
        />
      </div>
      <Button txt={btnTxt} onClick={addTodo} />
    </div>
  );
}

export default Form;