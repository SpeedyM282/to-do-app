import React, { useState } from 'react';
import { CHECKBOX_LABEL } from '../../data';
import Checkbox from '../Checkbox';
import './style.scss';

function Input({ label, type, value, onChange, max, disabled }) {
  const [inputType, setInputType] = useState('password');

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
          className='form__input'
          value={value}
          maxLength={max}
          onChange={(e) => onChange(e.target.value)}
          type={type === 'password' ? inputType : type}
          autoComplete="new-password"
          disabled={disabled ? 'disabled' : ''}
          required
        />
        {
          type === 'password' &&
          <Checkbox label={CHECKBOX_LABEL} onClick={toggleType} />
        }
      </label>
    </>
  )
}

export default Input;