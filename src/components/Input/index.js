import React, { useState } from 'react';
import { CHECKBOX_LABEL } from '../../data';
import Checkbox from '../Checkbox';
import './style.scss';

const Input = ({ label, type, value, onChange, max, min, disabled, isError, isEditMode }) => {
  const [inputType, setInputType] = useState(type);

  const ERROR_MESSAGE = 'Input must be more than 2 chars';
  const LOGIN_ERROR_MESSAGE = 'Please check credentials';

  const toggleType = () => {
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  }

  return (
    <>
      <label className={`form__label ${isEditMode && 'edit--mode'}`} >
        {label}:
        <input
          required
          value={value}
          maxLength={max}
          minLength={min}
          autoComplete="new-password"
          disabled={disabled ? 'disabled' : ''}
          onChange={(e) => onChange(e.target.value)}
          type={type === 'password' ? inputType : type}
          className={
            `form__input ${isError && ' input--error'} ${isEditMode && 'edit--mode--input'}`
          }
        />
        {
          isError &&
          <p className='error--message' >
            {
              label === 'Title' || label === 'Description' ?
                ERROR_MESSAGE :
                LOGIN_ERROR_MESSAGE
            }
          </p>
        }
        {
          type === 'password' &&
          <Checkbox label={CHECKBOX_LABEL} onClick={toggleType} />
        }
      </label>
    </>
  )
}

export default Input;