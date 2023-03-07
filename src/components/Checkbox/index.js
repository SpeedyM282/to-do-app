import React from 'react';
import './style.scss';

const Checkbox = ({ label, onClick }) => {
  return (
    <>
      <div className='form__checkbox__wrapper' >
        {label}:
        <input
          type="checkbox"
          className='form__checkbox'
          onClick={onClick}
        />
      </div>
    </>
  )
}

export default Checkbox;