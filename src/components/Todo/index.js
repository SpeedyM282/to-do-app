import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { ConfirmPrompt } from './ConfirmPrompt';
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

  const updDeleteClicked = () => {
    dispatch(updateIsDisabledAction(false));
    setDeleteClicked(false);
  }

  const onDeleteIconClick = () => {
    dispatch(updateIsDisabledAction(true));
    setDeleteClicked(true)
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
      .catch(() => {
        setEditClicked(false);
        dispatch(updateIsDisabledAction(false));
        toast.error("That didn't work.\n Please try again!");
      });
  }

  const deleteTodo = () => {
    setDeleteClicked(true);
    setShow(false);
    dispatch(updateIsDisabledAction(true));

    deleteTodoById(id)
      .then(() => {
        setDeleteClicked(false);

        dispatch(deleteTodoAction(id));
        dispatch(updateIsDisabledAction(false));
      })
      .catch(err => {
        setDeleteClicked(false);
        dispatch(updateIsDisabledAction(false));
        toast.error("This didn't work. Try again!");
      });
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
            <DeleteIcon onClick={onDeleteIconClick} disabled={editClicked || (isDisabled && id !== updateId)} />
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
        {
          deleteClicked && <ConfirmPrompt deleteTodo={deleteTodo} updDeleteClicked={updDeleteClicked} />
        }

        <Toaster position="top-left" />

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