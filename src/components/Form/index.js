import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todoPOST, todoPUT, todoByIdGET } from '../../api/todosAPI';
import { ADD_TODO, UPDATE_TODO } from '../../redux/actionTypes';
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

  const INPUT_MIN_LENGTH = 3;

  useEffect(() => {
    if (btnTxt === 'Save') {
      setLoaderDisplay('flex');

      todoByIdGET(todoID)
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
    setLoaderDisplay('flex');

    todoPUT(todoID, title, description)
      .then(res => {
        const data = {
          id: todoID,
          title,
          description
        }

        dispatch({ type: UPDATE_TODO, payload: data });
        setLoaderDisplay('none');
        onSave(false);
      })
    // .catch(err => alert('Something went wrong:\n' + err));
  }

  function addTodo() {
    if (title.length < INPUT_MIN_LENGTH || description.length < INPUT_MIN_LENGTH) {
      alert('Title and Description lengths must be more than 3 characters!');
      return;
    }

    todoPOST(title, description)
      .then(res => {
        dispatch({ type: ADD_TODO, payload: res.data });
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
          <Button txt={btnTxt} onClick={btnTxt === 'Add' ? addTodo : updateTodo} />
        </>
        : <Loader display={loaderDisplay} />
      }
    </div>
  );
}

export default Form;