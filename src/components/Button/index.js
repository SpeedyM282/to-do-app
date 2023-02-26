import React from 'react';
import './style.scss';

function Button({ txt, onClick }) {
  const style = {
    backgroundColor:
      txt === 'Logout' ? '#EB2E2E' :
        txt === 'Add' ? '#339900' :
          '#007bff'
  };

  return (
    <>
      <button
        className='button'
        type='button'
        style={style}
        onClick={onClick}
      >
        {txt}
      </button>
    </>
  )
}

export default Button;