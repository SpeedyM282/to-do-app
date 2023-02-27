import React from 'react';
import './style.scss';

function Button({ txt, onClick }) {
  const DANGER_COLOR = '#EB2E2E';
  const WARNING_COLOR = '#ffcc00';
  const SUCCESS_COLOR = '#339900';
  const PRIMARY_COLOR = '#007bff';

  const style = {
    backgroundColor:
      txt === 'Logout' ? DANGER_COLOR :
        txt === 'Add' ? SUCCESS_COLOR :
          txt === 'Save' ? WARNING_COLOR :
            PRIMARY_COLOR
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