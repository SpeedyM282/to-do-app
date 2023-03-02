import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postTodo, getTodoById, putTodoById } from '../../api/todosAPI';
import { inputsLabels } from '../../data';
import Input from '../Input';
import Button from '../Button';
import Loader from '../Loader';
import './style.scss';

function Form({ btnTxt, onSave }) {
  const dispatch = useDispatch();
  const todoID = useSelector(state => state.userReducer.id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loaderDisplay, setLoaderDisplay] = useState('none');
  const [isDisabled, setisDisabled] = useState(false);

  const INPUT_MIN_LENGTH = 3;

  useEffect(() => {
    if (btnTxt === 'Save') {
      setLoaderDisplay('flex');

      getTodoById(todoID)
        .then(res => {
          setLoaderDisplay('none');

          setTitle(res.data.title);
          setDescription(res.data.description);
        })
        .catch(err => alert('Something went wrong:\n' + err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateTodo() {
    if (title.length < INPUT_MIN_LENGTH || description.length < INPUT_MIN_LENGTH) {
      alert('Title and Description lengths must be more than 3 characters!');
      return;
    }
    setisDisabled(true);

    putTodoById(todoID, title, description)
      .then(() => {
        const data = {
          id: todoID,
          title,
          description
        }

        dispatch(updateTodo(data));
        setisDisabled(false);
        onSave(false);
      })
    // .catch(err => alert('Something went wrong:\n' + err));
  }

  function addTodo() {
    if (title.length < INPUT_MIN_LENGTH || description.length < INPUT_MIN_LENGTH) {
      alert('Title and Description lengths must be more than 3 characters!');
      return;
    }
    setisDisabled(true);

    postTodo(title, description)
      .then(res => {
        setisDisabled(false);
        dispatch(addTodo(res.data));
      })
      .catch(err => alert('Something went wrong:\n' + err));

    setTitle('');
    setDescription('');
  }

  return (
    <div style={{ boxShadow: loaderDisplay === 'flex' && 'none' }} className='form' >
      {loaderDisplay === 'none' ?
        <>
          <div className='inputs__block'>
            <Input
              label={inputsLabels.TODO_TITLE}
              type='text'
              max='15'
              value={title}
              onChange={(value) => setTitle(value)}
              disabled={isDisabled}
            />
            <Input
              label={inputsLabels.TODO_DESCRIPTION}
              type='text'
              max='30'
              value={description}
              onChange={(value) => setDescription(value)}
              disabled={isDisabled}
            />
          </div>
          <Button onClick={btnTxt === 'Add' ? addTodo : updateTodo} disabled={isDisabled} >
            {isDisabled ? <Loader display='flex' isSpinner={true} /> : btnTxt}
          </Button>
        </>
        : <Loader display={loaderDisplay} />
      }
    </div>
  );
}

export default Form;