import React from 'react';
import './style.scss';

function Button({ txt }) {
  return (
    <>
      <button
        className='button'
      >
        {txt}
      </button>
    </>
  )
}

export default Button;