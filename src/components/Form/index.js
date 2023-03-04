import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inputsLabels } from '../../data';
import { postTodo, putTodoById } from '../../api/todosAPI';
import { addTodoAction, updateTodoAction } from '../../store/reducers/todosReducer';
import Input from '../Input';
import Button from '../Button';
import Loader from '../Loader';
import './style.scss';

const Form = ({ btnTxt, onSave, titleForUpd, descriptionForUpd }) => {
  const dispatch = useDispatch();
  const todoID = useSelector(state => state.userReducer.id);

  const [title, setTitle] = useState('');
  const [isError, setIsError] = useState(false);
  const [description, setDescription] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const isEditMode = (btnTxt === 'Save');

  const INPUT_MIN_LENGTH = 3;
  const INPUT_MAX_LENGTH = 30;

  useEffect(() => {
    if (isEditMode) {
      setTitle(titleForUpd);
      setDescription(descriptionForUpd);
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
        onSave();
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
    <form className='form' >
      <div className='inputs__block'>
        <Input
          type='text'
          value={title}
          isError={isError}
          disabled={isDisabled}
          max={INPUT_MAX_LENGTH}
          min={INPUT_MIN_LENGTH}
          isEditMode={isEditMode}
          label={inputsLabels.TODO_TITLE}
          onChange={(value) => setTitle(value)}
        />

        <Input
          type='text'
          isError={isError}
          value={description}
          disabled={isDisabled}
          max={INPUT_MAX_LENGTH}
          min={INPUT_MIN_LENGTH}
          isEditMode={isEditMode}
          label={inputsLabels.TODO_DESCRIPTION}
          onChange={(value) => setDescription(value)}
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
    </form>
  );
}

export default Form;