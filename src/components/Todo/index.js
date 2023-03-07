import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteIcon, EditIcon } from '../../Icons';
import { buttonsTexts, CREATED_BY_ADMIN } from '../../data';
import { deleteTodoById, getTodoById } from '../../api/todosAPI';
import { updateIdAction, updateIsDisabledAction } from '../../store/reducers/userReducer';
import { deleteTodoAction } from '../../store/reducers/todosReducer';
import Form from '../Form';
import Loader from '../Loader';
import './style.scss';

const Todo = ({ id, title, description, createdBy }) => {
  const dispatch = useDispatch();

  const role = useSelector(state => state.userReducer.role);
  const isDisabled = useSelector(state => state.userReducer.isDisabled);
  const updateId = useSelector(state => state.userReducer.id);

  const [show, setShow] = useState(true);
  const [todoData, setTodoData] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);

  const updIsEditMode = () => {
    setIsEditMode(false);
  }

  const updateTodoMode = () => {
    setEditClicked(true);
    setIsFetched(false);
    dispatch(updateIsDisabledAction(true));

    getTodoById(id)
      .then(res => {
        dispatch(updateIdAction(id));

        setEditClicked(false);

        setTodoData({
          title: res.data.title,
          description: res.data.description
        });

        setIsFetched(true);
        setIsEditMode(true);
      })
      .catch(err => {
        dispatch(updateIsDisabledAction(false));
        alert('Something went wrong:\n' + err);
      });
  }

  const deleteTodo = () => {
    setDeleteClicked(true);
    setShow(false);

    deleteTodoById(id)
      .then(() => {
        setDeleteClicked(false);
        dispatch(deleteTodoAction(id));
      })
      .catch(err => alert('Something went wrong:\n' + err)); // USE TOASTER
  }

  const TodoButtons = () => {
    if (role === 'user' && createdBy !== 'user') {
      return <h5>{CREATED_BY_ADMIN}</h5>;
    }

    return (
      <div className='todo__buttons__block' >
        {
          editClicked && !isFetched ?
            <Loader display='flex' isSpinner={true} isDark={true} /> :
            <EditIcon onClick={updateTodoMode} disabled={deleteClicked || (isDisabled && id !== updateId)} />
        }

        {
          deleteClicked ?
            <Loader display='flex' isSpinner={true} isDark={true} /> :
            <DeleteIcon onClick={deleteTodo} disabled={editClicked} />
        }
      </div>
    );
  }

  return (
    show && isEditMode ?
      <Form
        onSave={updIsEditMode}
        btnTxt={buttonsTexts.SAVE}
        titleForUpd={todoData.title}
        descriptionForUpd={todoData.description}
      /> :
      <div className='todo__block' >

        <div className='todo__text__block' >
          <h2 className='todo__text-title' >
            {title}
          </h2>

          <p className='todo__text-description' >
            {description}
          </p>
        </div>

        <TodoButtons />
      </div>
  )
}

export default Todo;