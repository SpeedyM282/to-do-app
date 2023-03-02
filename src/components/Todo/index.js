import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoById } from '../../api/todosAPI';
import { buttonsTexts, CREATED_BY } from '../../data';
import { DeleteIcon, EditIcon } from '../../Icons';
import { updateID } from '../../store/reducers/userReducer';
import Form from '../Form';
import Loader from '../Loader';
import './style.scss';

const Todo = ({ id, title, description, createdBy }) => {
  const dispatch = useDispatch();
  const role = useSelector(state => state.userReducer.role);

  const [show, setShow] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [editForm, setEditForm] = useState(<></>);

  const updIsEditMode = value => {
    setIsEditMode(value);
  }

  const updateTodoMode = () => {
    dispatch(updateID(id));
    setEditForm(<Form btnTxt={buttonsTexts.SAVE} onSave={updIsEditMode} isUpdating={isEditMode} />);
    setIsEditMode(true);
  }

  const deleteTodo = () => {
    setIsDisabled(true);
    setShow(false);

    deleteTodoById(id)
      .then(() => {
        setIsDisabled(false);
        dispatch(deleteTodo(id));
      })
      .catch(err => alert('Something went wrong:\n' + err));
  }

  const buttons = () => {
    if (role === 'user' && createdBy !== 'user') {
      return <h5>{CREATED_BY}</h5>;

    } else {
      return (
        <div className='todo__buttons__block' >
          <EditIcon onClick={updateTodoMode} disabled={isDisabled} />
          {isDisabled ? <Loader display='flex' isSpinner={true} isDark={true} /> : <DeleteIcon onClick={deleteTodo} disabled={isDisabled} />}
        </div>
      );
    }
  }

  return show && isEditMode ? editForm : (
    <div className='todo__block' >
      <div className='todo__text__block' >
        <h2 className='todo__text--title' >{title}</h2>
        <p className='todo__text--description' >{description}</p>
      </div>
      {buttons()}
    </div>
  );
}

export default Todo;