import React from 'react';
import './style.scss';

function Checkbox({ label, onClick }) {
  return (
    <>
      <div className='form__checkbox__wrapper' >
        {label}:
        <input
          className='form__checkbox'
          type="checkbox"
          onClick={onClick}
          required
        />
      </div>
    </>
  )
}

export default Checkbox;