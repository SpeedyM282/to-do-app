import React, { useState } from 'react';
import { CHECKBOX_LABEL, errorMessages, inputsLabels } from '../../data';
import Checkbox from '../Checkbox';
import './style.scss';

const Input = ({ label, type, value, onChange, max, min, disabled, isError, isEditMode }) => {
  const [inputType, setInputType] = useState(type);

  const toggleType = () => {
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  }

  const labelClassName = `form__label ${isEditMode && 'edit--mode'}`;
  const inputClassName = `form__input ${isError && ' input--error'} ${isEditMode && 'edit--mode--input'}`;

  return (
    <>
      <label className={labelClassName} >
        {label}:
        <input
          required
          value={value}
          maxLength={max}
          minLength={min}
          className={inputClassName}
          autoComplete="new-password"
          disabled={disabled ? 'disabled' : ''}
          onChange={(e) => onChange(e.target.value)}
          type={type === 'password' ? inputType : type}
        />
        {
          isError &&
          <p className='error-message' >
            {
              label === inputsLabels.TITLE || label === inputsLabels.DESCRIPTION ?
                errorMessages.ERROR_MESSAGE :
                errorMessages.LOGIN_ERROR_MESSAGE
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