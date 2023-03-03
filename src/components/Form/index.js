import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postTodo, getTodoById, putTodoById } from '../../api/todosAPI';
import { inputsLabels } from '../../data';
import { addTodoAction, updateTodoAction } from '../../store/reducers/todosReducer';
import Input from '../Input';
import Button from '../Button';
import Loader from '../Loader';
import './style.scss';

const Form = ({ btnTxt, onSave }) => {
  const dispatch = useDispatch();
  const todoID = useSelector(state => state.userReducer.id);

  const [title, setTitle] = useState('');
  const [isError, setIsError] = useState(false);
  const [description, setDescription] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [loaderDisplay, setLoaderDisplay] = useState('none');

  const INPUT_MIN_LENGTH = 3;
  const INPUT_MAX_LENGTH = 30;

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

  const updateTodo = () => {
    if (title.length < INPUT_MIN_LENGTH || description.length < INPUT_MIN_LENGTH) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setIsDisabled(true);

    putTodoById(todoID, title, description)
      .then(() => {
        const data = {
          id: todoID,
          title,
          description
        }

        dispatch(updateTodoAction(data));
        setIsDisabled(false);
        onSave(false);
      })
      .catch(err => alert('Something went wrong:\n' + err));
  }

  const addTodo = () => {
    if (title.length < INPUT_MIN_LENGTH || description.length < INPUT_MIN_LENGTH) {
      setIsError(true);
      return;
    }

    setIsError(false);
    setIsDisabled(true);

    postTodo(title, description)
      .then(res => {
        setIsDisabled(false);
        dispatch(addTodoAction(res.data));
      })
      .catch(err => {
        setIsDisabled(false);
        alert('Something went wrong:\n' + err)
      });

    setTitle('');
    setDescription('');
  }

  return (
    <form style={{ boxShadow: loaderDisplay === 'flex' && 'none' }} className='form' >
      {loaderDisplay === 'none' ?
        <>
          <div className='inputs__block'>
            <Input
              label={inputsLabels.TODO_TITLE}
              type='text'
              isError={isError}
              max={INPUT_MAX_LENGTH}
              min={INPUT_MIN_LENGTH}
              value={title}
              onChange={(value) => setTitle(value)}
              disabled={isDisabled}
            />
            <Input
              label={inputsLabels.TODO_DESCRIPTION}
              type='text'
              isError={isError}
              max={INPUT_MAX_LENGTH}
              min={INPUT_MIN_LENGTH}
              value={description}
              onChange={(value) => setDescription(value)}
              disabled={isDisabled}
            />
          </div>
          <Button
            onClick={btnTxt === 'Add' ? addTodo : updateTodo}
            type='submit'
            disabled={isDisabled}
          >
            {
              isDisabled ?
                <Loader display='flex' isSpinner={true} /> :
                btnTxt
            }
          </Button>
        </>
        : <Loader display={loaderDisplay} />
      }
    </form>
  );
}

export default Form;