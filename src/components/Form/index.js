import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buttonsTexts, inputsLabels } from '../../data';
import { postTodo, putTodoById } from '../../api/todosAPI';
import { updateIsDisabledAction } from '../../store/reducers/userReducer';
import { addTodoAction, updateTodoAction } from '../../store/reducers/todosReducer';
import Input from '../Input';
import Button from '../Button';
import './style.scss';

const Form = ({ btnTxt, onSave, titleForUpd, descriptionForUpd }) => {
  const dispatch = useDispatch();
  const todoID = useSelector(state => state.userReducer.id);

  const [title, setTitle] = useState('');
  const [isError, setIsError] = useState(false);
  const [description, setDescription] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const isEditMode = (btnTxt === buttonsTexts.SAVE);

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
        dispatch(updateIsDisabledAction(false));
        dispatch(updateTodoAction(data));
        setIsDisabled(false);
        onSave();
      })
      .catch(err => alert('Something went wrong:\n' + err)); // обработать правильно и вывести тостер
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

        setTitle('');
        setDescription('');
      })
      .catch(err => {
        setIsDisabled(false);
        alert('Something went wrong:\n' + err)
      });
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
          label={inputsLabels.TITLE}
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
          label={inputsLabels.DESCRIPTION}
          onChange={(value) => setDescription(value)}
        />
      </div>

      <Button
        type='submit'
        disabled={isDisabled}
        loaderDisplay={isDisabled ? 'flex' : 'none'}
        onClick={btnTxt === buttonsTexts.ADD ? addTodo : updateTodo}
      >
        {btnTxt}
      </Button>
    </form>
  );
}

export default Form;