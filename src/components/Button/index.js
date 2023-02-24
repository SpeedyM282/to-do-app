import React from 'react';
import './style.scss';

function Button({ txt, onClick }) {
  const style = {
    backgroundColor: txt === 'Delete' ? '#EB2E2E' : '#007bff'
  };

  return (
    <>
      <button
        className='button'
        style={style}
        onClick={onClick}
      >
        {txt}
      </button>
    </>
  )
}

export default Button;