import React, { useState } from 'react';
import { CHECKBOX_LABEL } from '../../data';
import Checkbox from '../Checkbox';
import './style.scss';

function Input({ label, type, value, onChange, max, min, disabled, isError }) {
  const [inputType, setInputType] = useState('password');
  const ERROR_MESSAGE = 'Input length must be more than 3 characters';
  const LOGIN_ERROR_MESSAGE = 'Please check credentials';

  function toggleType() {
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  }

  return (
    <>
      <label className='form__label' >
        {label}:
        <input
          className={'form__input' + (isError ? ' input--error' : '')}
          value={value}
          maxLength={max}
          minLength={min}
          onChange={(e) => onChange(e.target.value)}
          type={type === 'password' ? inputType : type}
          autoComplete="new-password"
          disabled={disabled ? 'disabled' : ''}
          required
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