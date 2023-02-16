import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Todo from '../../components/Todo';
import './style.scss';

function TodoList() {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');

  function updHeading(value) {
    setHeading(value);
  }

  function updDescription(value) {
    setDescription(value);
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
            label='Heading'
            type='text'
            max='15'
            value={heading}
            onChange={updHeading}
          />
          <Input
            label='Description'
            type='text'
            max='40'
            value={description}
            onChange={updDescription}
          />
        </div>
        <Button txt='Add' />
      </div>

      <div className='todolist__list__block' >
        <Todo heading='Todo-1' description='Hello World' />
        <Todo heading='Todo-2' description='Hello World' />
        <Todo heading='Todo-3' description='Hello World' />
        <Todo heading='Todo-4' description='Hello World' />
      </div>
    </div>
  );
}

export default TodoList;